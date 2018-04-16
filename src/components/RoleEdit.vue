<!--todo: urller conf json dan gelmeli-->
<!--todo: delete popconfirm ile yapılmalı-->
<!--todo: addNew formuna validate eklenmeli-->
<!--todo: silme, ekleme ve düzenleme işlemlerine optimistik ui desteği eklenmeli-->

<!--todo: edit perm çalıştırılmalı-->
<!--todo: perm seçilip kaydet e tıklandığında kaydedilmeli-->
<!--todo: edit ve delete button :clicked ile func çalıtırabilmeli-->
<template>
    <form method="post" :action="formAction">
        <csrf-token-input/>
        <div class="col-md-3">
            <div class="form-group">
                <label>Rol Sistemsel adı </label>
                <input type="text" name="name" :value="roleName" class="border default">
            </div>
            <input type="hidden" name="id" :value="roleId">
            <div class="form-group">
                <label>Rol Gözüken adı </label>
                <input type="text" name="display_name" :value="roleDisplayname" class="border default">
            </div>
            <div class="form-group">
                <label>Rol Açıklama </label>
                <input type="text" name="description" :value="roleDescription" class="border default">
            </div>
            <button type="submit" class="btn btn-success filled large">Kaydet</button>
        </div>
        <div class="col-md-9">
            <h3>Yetkiler</h3>
            <table class="table">
                <tr>
                    <th>İsim</th>
                    <th>Gözüken İsim</th>
                    <th>Açıklama</th>
                    <th></th>
                </tr>
                <tr v-for="(perm, id) in perms">
                    <!--if edit is passif-->
                    <td v-if="!perm.edit">
                        <check-box
                                :value="perm.id"
                                name="perms[]"
                                :label="perm.name"
                                :checked="perm.active"
                        />
                    </td>
                    <td v-if="!perm.edit">
                        {{perm.display_name}}
                    </td>
                    <td v-if="!perm.edit">
                        {{perm.description}}
                    </td>
                    <!--if edit is active-->
                    <td v-if="perm.edit">
                        <input v-model="editPerm.name">
                    </td>
                    <td v-if="perm.edit">
                        <input v-model="editPerm.display_name">
                    </td>
                    <td v-if="perm.edit">
                        <input v-model="editPerm.description">
                    </td>
                    <td>
                        <a v-if="perm.edit"
                           @click="() =>updateButtonPressed(perm.id, id)"
                           class="btn btn-primary filled x-small"
                           :disabled="isUpdateButtonDisable"
                        >kaydet</a>

                        <a v-if="!perm.edit"
                           @click="() =>editButtonPressed(perm.id, id)"
                           class="btn filled btn-info x-small">düzelt</a>
                        <a @click="() => deleteButtonPressed(perm.id, id)"
                           class="btn filled btn-danger x-small">sil</a>
                    </td>
                </tr>
                <tr v-if="addNew">
                    <td>
                        <div class="input-wrapper">
                            <input v-model="newPerm.name" placeholder="Name"/>
                        </div>
                    </td>
                    <td>
                        <div class="input-wrapper">
                            <input v-model="newPerm.display_name" placeholder="Display Name"/>
                        </div>
                    </td>
                    <td>
                        <div class="input-wrapper">
                            <input v-model="newPerm.description" placeholder="Description"/>
                        </div>
                    </td>
                    <td>
                        <a @click="() => addButtonPressed()"
                           class="btn filled btn-primary">Ekle</a>
                    </td>
                </tr>
            </table>

            <!--<Popconfirm title="Are you sure？" okText="Yes" cancelText="No">-->
            <!--<a href="#">Delete</a>-->
            <!--</Popconfirm>-->
            <a href="#" class="btn filled btn-info small" @click="addNew = true">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </a>
        </div>
    </form>
</template>

<script>
    import CheckBox from './inputs/Checkbox.vue'
    import DeleteButton from './buttons/DeleteButton.vue'
    import EditButton from './buttons/EditButton.vue'
    // import vButton from './buttons/Button.vue'
    import CsrfTokenInput from './CsrfTokenInput.vue'

    export default {
        name: "role-edit",
        props: {
            formAction: {
                type: String,
                required: true
            },
            roleId: {
                type: String,
                required: true
            },
            roleName: {
                type: String,
                required: true
            },
            roleDisplayname: {
                type: String,
                required: true
            },
            roleDescription: {
                type: String,
                required: true
            }
        },
        data() {
            return {

                permissions: [],
                activePermissions: [],
                formData: {},
                newPerm: {
                    name: '',
                    display_name: '',
                    description: ''
                },
                addNew: false,
                editPerm: {
                    id: null,
                    name: null,
                    display_name: null,
                    description: null
                },
                editPermNameBeforeEdit: null
            }
        },
        created() {
            this.getPerms();
            this.getRolePerms();
        },
        methods: {
            getPerms: function () {
                axios.get(`/perms/api/`)
                    .then(response => {
                        this.permissions = response.data
                    })
                    .catch(e => {
                        // todo: hata varsa alert edilmeli
                        console.log("e", e)
                    })
            },
            getRolePerms: function () {
                axios.get(`/role/api/perms/${this.roleId}`)
                    .then(response => {
                        this.activePermissions = response.data
                    })
                    .catch(e => {
                        // todo: hata varsa alert edilmeli
                        console.log("getRolePerms e", e)
                    })
            },
            deleteButtonPressed: function (permId, id) {
                axios.post(`/perms/api/delete/${permId}`, {id: permId})
                    .then(response => {
                        if (response.status) {
                            this.permissions.pop(this.permissions[idx])
                        } else {
                            console.log("deleteButtonPressed status true değil")
                            // todo: status true değilse alert edilmeli
                        }
                    })
                    .catch(e => {
                        // todo: hata mesajı varsa alert edilmeli
                        console.log("deleteButtonPressed e:", e)
                    })
            },
            addButtonPressed: function () {
                const self = this;
                axios.post('/perms/api/add', this.newPerm)
                    .then(response => {
                        if (response.status) {
                            this.permissions.push({
                                name: this.newPerm.name,
                                display_name: this.newPerm.display_name
                            })
                            this.newPerm = {}
                            this.addNew = false
                        }
                    }).catch(e => {
                    // todo: hata mesajı varsa alert edilmeli
                    console.log("deleteButtonPressed e:", e)
                });
            },
            editButtonPressed: function (permId, id) {
                this.editPermNameBeforeEdit = this.permissions[id]['name']
                _.map(Object.keys(this.editPerm), key => {
                    this.editPerm[key] = this.permissions[id][key]
                })
                _.map(this.permissions, (perm, idx) => {
                    if (perm.id === permId) {
                        this.permissions[idx].edit = true
                    } else {
                        this.permissions[idx].edit = false
                    }
                })
                this.$forceUpdate()
            },
            updateButtonPressed: function (permId, id) {
                if (this.isUpdateButtonDisable) return null

                axios.post(`/perms/api/update/${permId}`, this.editPerm)
                    .then(response => {
                        console.log("updateButtonPressed response", response)
                        if (response.status) {
                            this.permissions[id].edit = false;
                            _.map(Object.keys(this.editPerm), key => {
                                this.permissions[id][key] = this.editPerm[key]
                            })
                            this.$forceUpdate()
                        } else {
                            console.log("status true değil")
                            // todo: status true değilse alert edilmeli
                        }
                    })
                    .catch(e => {
                        // todo: hata mesajı varsa alert edilmeli
                        console.log("updateButtonPressed e:", e)
                    })
            }
        },
        computed: {
            perms() {
                return _.reduce(this.permissions, (r, perm) => {
                    let temp = perm;
                    temp.edit = false;
                    _.map(this.activePermissions, item => {
                        if (perm.name === item.name) {
                            temp.active = true;
                        }
                    });
                    r.push(perm);
                    return r;
                }, []);
            },
            isUpdateButtonDisable() {
                return this.editPermNameBeforeEdit === this.editPerm.name
            }
        },
        components: {
            CheckBox,
            DeleteButton,
            EditButton,
            CsrfTokenInput
            // ,vButton
        }
    }
</script>

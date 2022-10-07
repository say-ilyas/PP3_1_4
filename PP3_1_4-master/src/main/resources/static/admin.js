const url = '/api/admin'
const urlForHeader = '/api/header'
const urlForRoles = '/api/roles'
const header = document.getElementById('header')
const headerRoles = document.getElementById('headerRoles')
const usersTable = document.querySelector('#navTab a:first-child')
const newUsersTable = bootstrap.Tab.getOrCreateInstance(usersTable)
const tbody = document.querySelector('tbody')

const newUser = document.getElementById('newUser')
const name = document.getElementById('addName')
const surname = document.getElementById('addSurname')
const age = document.getElementById('addAge')
const email = document.getElementById('addEmail')
const username = document.getElementById('addUsername')
const password = document.getElementById('addPassword')
const roles = document.getElementById('addRole')

const deleteModal = document.getElementById('deleteModal')
const newDeleteModal = bootstrap.Modal.getOrCreateInstance(deleteModal)
const deleteId = document.getElementById('deleteId')
const deleteName = document.getElementById('deleteName')
const deleteSurname = document.getElementById('deleteSurname')
const deleteAge = document.getElementById('deleteAge')
const deleteEmail = document.getElementById('deleteEmail')
const deleteUsername = document.getElementById('deleteUsername')
const deleteRole = document.getElementById('deleteRole')

const editModal = document.getElementById('editModal')
const newEditModal = bootstrap.Modal.getOrCreateInstance(editModal)
const editId = document.getElementById('editId')
const editName = document.getElementById('editName')
const editSurname = document.getElementById('editSurname')
const editAge = document.getElementById('editAge')
const editEmail = document.getElementById('editEmail')
const editUsername = document.getElementById('editUsername')
const editPassword = document.getElementById('editPassword')
const editRole = document.getElementById('editRole')

function getAuthentication() {
    fetch(urlForHeader)
        .then(response => response.json())
        .then(user => {
            const text = user.username
            const text2 = ' with roles: ' + user.roles.map(r => r.name)
            header.innerHTML = text
            headerRoles.innerHTML = text2
            console.log(user)
        })
}

getAuthentication()


let result = ''
const showUsersTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                result += `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.username}</td>
                            <td>${user.roles.map(r => r.name)}</td>
                            <td><button type="submit" class="btnEdit btn btn-primary" 
                                data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
                            <td><button type="submit" class="btnDel btn btn-danger" 
                                data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button></td>
                        </tr>`
            })
            tbody.innerHTML = result
        })
}

fetch(url)
    .then(response => response.json())
    .then(data => showUsersTable(data))
    .catch(error => console.log(error))

function getAllRoles(target) {
    fetch(urlForRoles)
        .then(response => response.json())
        .then(roles => {
            let optionsRoles = ''
            roles.forEach(role => {
                optionsRoles += `<option value='${role.id}'>${role.name}</option>`
            })
            target.innerHTML = optionsRoles
        })
}

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}

const refreshUsersTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            result = ''
            showUsersTable(data)
        })
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


on(document, 'click', '.btnEdit', e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    editId.value = target.children[0].innerHTML
    editName.value = target.children[1].innerHTML
    editSurname.value = target.children[2].innerHTML
    editAge.value = target.children[3].innerHTML
    editEmail.value = target.children[4].innerHTML
    editUsername.value = target.children[5].innerHTML
    editPassword.value = ''
    editRole.value = getAllRoles(editRole)
})

editModal.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#editRole');
    let setRoles = roleArray(options)
    fetch(url + `/${id}`, {
        method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            id: editId.value,
            name: editName.value,
            surname: editSurname.value,
            age: editAge.value,
            email: editEmail.value,
            username: editUsername.value,
            password: editPassword.value,
            roles: setRoles
        })
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
    newEditModal.hide()
})


on(document, 'click', '.btnDel', e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    deleteId.value = target.children[0].innerHTML
    deleteName.value = target.children[1].innerHTML
    deleteSurname.value = target.children[2].innerHTML
    deleteAge.value = target.children[3].innerHTML
    deleteEmail.value = target.children[4].innerHTML
    deleteUsername.value = target.children[5].innerHTML
    deleteRole.value = getAllRoles(deleteRole)
})

deleteModal.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url + `/${id}`, {
        method: 'DELETE',
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
    newDeleteModal.hide()
})


getAllRoles(roles)
newUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let options = document.querySelector('#addRole');
    let setRoles = roleArray(options)
    fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            age: age.value,
            email: email.value,
            username: username.value,
            password: password.value,
            roles: setRoles
        })
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
    newUsersTable.show()
    name.value = ''
    surname.value = ''
    age.value = ''
    email.value = ''
    username.value = ''
    password.value = ''
    roles.value = ''
})
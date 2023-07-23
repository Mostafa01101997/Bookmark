var webName = document.getElementById('bookmarkName');
var webUrl = document.getElementById('bookmarkUrl');
var userData;

if (localStorage.getItem('userData')) {
    var userData = JSON.parse(localStorage.getItem('userData'));
    displayData(userData);
}
else {
    userData = [];
}

function checkedData() {
    var tst = webName.value.length;
    console.log(tst);

    if (tst < 4) {
        document.getElementById("bookmarkName").classList.add('is-invalid')
        return true
    }
    document.getElementById("bookmarkName").classList.replace('is-invalid', 'is-valid')
    return false;

}

function checkUrl() {
    var urlInput = webUrl.value;
    var validUrl = (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    var validateResult = validUrl.test(urlInput);
    if (validateResult === false) {
        document.getElementById("bookmarkUrl").classList.add('is-invalid')
        return false
    }
    document.getElementById("bookmarkUrl").classList.replace('is-invalid', 'is-valid')
    return true;

}

function add() {
    var user = {
        name: webName.value,
        url: webUrl.value
    }
    // console.log(checkedData()+'data trueeeeee');
    // console.log(checkUrl()+'data falseeeeeeee');
    if ((user.name == "" || checkedData() === true) || (user.url == "" || checkUrl() === false)) {
        document.getElementById('alertbox').classList.remove('d-none');
    }
    else {
        userData.push(user);

    }

    displayData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    clearData();
    console.table(userData)
}

function displayData(lst) {
    var box = ``;
    for (var i = 0; i < lst.length; i++) {
        box += `<tr>
        <td>${i + 1}</td>
        <td>${lst[i].name}</td>
        <td>
           <a href="${lst[i].url}" target="_blank"> <button class="btn btn-warning" ><i class="fa-solid fa-eye pe-2"></i> Visit</button></a>
        </td>
        <td>
            <button class="btn btn-danger"  onclick="deleteElement(${i})">Delete</button>
        </td>
    </tr>`

    }
    document.getElementById('tableContent').innerHTML = box;
}

function clearData() {
    webName.value = '';
    webUrl.value = '';
}

function deleteElement(index) {
    userData.splice(index, 1);
    localStorage.setItem('userData', JSON.stringify(userData));
    displayData(userData);
    console.log(userData);

}


function closeBoxalert() {
    document.getElementById('alertbox').classList.add('d-none');
}
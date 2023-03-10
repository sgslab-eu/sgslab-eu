
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js'

function initialize(config){
    const app = initializeApp( config );
    const auth = getAuth(app);
    return auth;
}

function signin(auth, username, password){
    return signInWithEmailAndPassword(auth, username, password)
        .then( (data) => {return data;} )
        .catch( (error) => {throw error} );
}

function getToken(userCredentials){
    return userCredentials.user.getIdToken()
        .then( (data) => {return data;} )
        .catch( (error) => {throw error} );
}

function setStatus(propData){
    $('#status').val(propData['value'][0]);
}


async function renderPage(config, page_id, spaceKey, window) {

    const auth = await initialize(config['firebase']);

    const credentials = await signin(auth, config['signin']['username'], config['signin']['password']);
    
    const token = await getToken(credentials);

    const data = await getData(page_id, spaceKey, config['firebase']['databaseURL'], token );

    $('#product_name').val(data['product_name']);
    $('#desc').val(data['desc']);
    $('#pack_size').val(data['pack_size']);
    $('#stability').val(data['stability']);
    $('#storage_conditions').val(data['storage_conditions']);
    $('#country').val(data['country']);
    $('#procedure_number').val(data['procedure_number']);
    $('#ma_number').val(data['ma_number']);
    $('#ma_grant_date').val(data['ma_grant_date']);
    $('#ma_renewal_date').val(data['ma_renewal_date']);
    $('#remarks').val(data['remarks']);
    let s = '';
    let f = [];
    const downloadUrl = 'https://sgslab.atlassian.net/wiki/download/attachments/' + page_id
    $('#document').append($('<option>', { value: 0, text: '---Select---'}));
    let pending_changes = 0;
    for (let val of data['file_list']) {
        s = `${s} <b>${val['type']}</b>: <a href="${downloadUrl}/${val['name']}">${val['name']}</a>`;
        if(val['status']!=0){
            s = `${s} <i>(Change Pending)</i>`;
            pending_changes++;
        }
        else {
            $('#document').append($('<option>', { value: val['name'], text: val['name'] }));
        }
        s = `${s}<br>`
        f.push(val['name']);
    }
    $('#file_list').html(s);
    $('#status').val(pending_changes);
    data['file_names'] = f.toString();

    await configIssueCollector(config['issueCollector'], window, data);
}

function getData(page_id, spaceKey, baseUrl, token){
    let URL = baseUrl + '/documents/' + page_id + '.json?auth=' + token;
    return $.ajax(URL, {
        type: 'GET,PUT,POST,DELETE',
        dataType: 'jsonp',
        async: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    })
    .then( (response) => { return response;})
    .then( (data) =>  { 
        data['page_id'] = page_id;
        data['spaceKey'] = spaceKey;
        return data;
     })
    .catch( (error) => {throw error} );
}

function configIssueCollector(colloectorUrl, window, data) {
    $.ajax({
        url: colloectorUrl, 
        type: 'GET',
        async: false,
        cache: true,
        dataType: 'script',
        success: () => window.ATL_JQ_PAGE_PROPS = {
                "triggerFunction": function(showCollectorDialog) {
                    jQuery("#change").click(function(e) {
                        e.preventDefault();
                        if($('#document').val()!=0){
                            window.ATL_JQ_PAGE_PROPS.fieldValues.customfield_10200 =$('#document').val();
                            $('#change').prop('disabled', true);
                            showCollectorDialog();
                        }
                        
                    });
                },
                fieldValues: {
                    summary : 'Change request for ' + data['product_name'],
                    customfield_10195 : data['page_id'],
                    customfield_10194 : data['spaceKey'],
                    customfield_10067 : data['product_name'],
                    customfield_10209 : data['pack_size'],
                    customfield_10204 : data['procedure_number'],
                    customfield_10210 : data['ma_number'],
                    customfield_10202 : data['ma_grant_date'],
                    customfield_10203 : data['ma_renewal_date'],
                    customfield_10208 : 'https://sgslab.atlassian.net/wiki/spaces/' + data['spaceKey'] + '/pages/' + data['page_id'],
                }
            }
        ,
        error: (xhr, textStatus, error) => {throw error;}
    });
}

export { renderPage, setStatus };
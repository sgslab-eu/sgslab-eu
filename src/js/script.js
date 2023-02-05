
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js'

const htmlContent = `
    <section class="header">
        <h2 class="title">SGS DCC</h2>
        <p>
            SGS Document Change Controller
        </p>
    </section>
    <div class="page-section">
        <h2>Document Detail</h2>
        <div class="change-box">
            <label for="page_id">PageId</label>
            <input id="page_id" type="text" readonly>

            <label for="product_name">Name of Product</label>
            <input id="product_name" type="text" readonly>
            
            <label for="desc">Description</label>
            <input id="desc" type="text" readonly>

            <label for="pack_size">Pack Size</label>
            <input id="pack_size" type="text" readonly></input>
            
            <label for="stability">Stability</label>
            <input id="stability" type="text" readonly></input>

            <label for="storage_conditions">Storage Conditions</label>
            <input id="storage_conditions" type="text" readonly></input>

            <label for="country">Country</label>
            <input id="country" type="text" readonly></input>

            <label for="procedure_number">Procedure #</label>
            <input id="procedure_number" type="text" readonly></input>

            <label for="ma_number">MA #</label>
            <input id="ma_number" type="text" readonly></input>

            <label for="ma_grant_date">MA Grant Date</label>
            <input id="ma_grant_date" type="text" readonly></input>

            <label for="ma_renewal_date">MA Renewal Date</label>
            <input id="ma_renewal_date" type="text" readonly></input>


            <label for="remarks">Remarks</label>
            <textarea id="remarks" readonly></textarea>
        </div>
    </div>

    <div class="page-section">
        <h2>Files Attached</h2>
        <div class="change-box">
            <pre><code id="file_list" style="background-color:white; padding: 20px;"></code></pre>
            
            <div style="width: 100%; display: flex; align-items: flex-end; flex-direction: column;">
                <input id="change" class="button-primary" type="button" style="width: 180px;"  value="Change Request" />
            </div>
        </div>
    </div>

    <div class="page-section">
        <h3>Current Login</h3>
        <pre><code id="user" style="overflow: scroll;"></code></pre>
        <h3>Data</h3>
        <pre><code id="data" style="overflow: scroll;"></code></pre>
        <h3>Result</h3>
        <pre><code id="result" style="overflow: scroll;"></code></pre>
    </div>`;


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

function getData(doc_id, baseUrl, token){
    let URL = baseUrl + '/documents/' + doc_id + '.json?auth=' + token;
    console.log(URL);
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
    .then( (data) =>  { return data; })
    .catch( (error) => {throw error} );
}

function renderData(data) {
    $('#result').text(JSON.stringify(data,null,2));
    $('#product_name').val(data['product_name']);
    $('#desc').val(data['desc']);
    $('#packe_size').val(data['pack_size']);
    $('#remarks').val(data['remarks']);
    let s = '';
    for (let val of data['file_list']) {
        s = `${s} <b>${val['type']}</b>: ${val['name']}<br>`;
    }
    $('#file_list').html(s);
}

export {htmlContent, initialize, signin, getData, getToken, renderData};
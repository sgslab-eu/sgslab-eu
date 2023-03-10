const adminAccounts =  [
    '6315af16316bbc56c425438a',
    '5fc54819facfd60076261143'
];

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
    <div class="row">
        <div class="six columns">
            <label for="page_id">PageId</label>
            <input id="page_id" type="text" readonly>
        </div>
        <div class="six columns">
            <label for="status">Pending Changes</label>
            <input id="status" type="text" readonly>
        </div>
    </div>
    <div class="row">
        <div class="twelve columns">
            <label for="product_name">Name of Product</label>
            <input id="product_name" type="text" readonly>
        </div>
    </div>
    <div class="row">
        <div class="twelve columns">
            <label for="desc">Description</label>
            <input id="desc" type="text" readonly>
        </div>
    </div>
    <div class="row">
        <div class="six columns">
            <label for="pack_size">Pack Size</label>
            <input id="pack_size" type="text" readonly></input>
        </div>
        <div class="six columns">
            <label for="stability">Stability</label>
            <input id="stability" type="text" readonly></input>
        </div>
    </div>
    <div class="row">
        <div class="six columns">
            <label for="storage_conditions">Storage Conditions</label>
            <input id="storage_conditions" type="text" readonly></input>
        </div>
        <div class="six columns">
            <label for="country">Country</label>
            <input id="country" type="text" readonly></input>
        </div>
    </div>
    <div class="row">
        <div class="six columns">
            <label for="procedure_number">Procedure #</label>
            <input id="procedure_number" type="text" readonly></input>
        </div>
        <div class="six columns">
            <label for="ma_number">MA #</label>
            <input id="ma_number" type="text" readonly></input>
        </div>
    </div>
    <div class="row">
        <div class="six columns">
            <label for="ma_grant_date">MA Grant Date</label>
            <input id="ma_grant_date" type="text" readonly></input>
        </div>
        <div class="six columns">
            <label for="ma_renewal_date">MA Renewal Date</label>
            <input id="ma_renewal_date" type="text" readonly></input>
        </div>
    </div>
    <div class="row">
        <div class="twelve columns">
            <label for="remarks">Remarks</label>
            <textarea id="remarks" readonly></textarea>
        </div>
    </div>
</div>
</div>
<div class="page-section">
<h2>Files Attached</h2>
<div class="change-box">
    <pre><code id="file_list" style="background-color:white; padding: 20px;"></code></pre>
    
    <div id="document_div" class="row">
        <div class="twelve columns">
            <label for="document">Select document to change</label>
            <select id="document"  style="width: 100%;"/>
        </div>
    </div>

    

    <div id="change_div" style="width: 100%; display: flex; flex-direction: row;">
            <input id="change" class="button-primary" type="button" style="display: flex; align-items: flex-end; width: 180px; margin-left: auto" value="Change Request" />
    </div>
</div>

<div class="page-section"  style="display: none">
    <h3>Current Login</h3>
    <pre><code id="user" style="overflow: scroll;"></code></pre>
    <h3>Data</h3>
    <pre><code id="data" style="overflow: scroll;"></code></pre>
    <h3>Result</h3>
    <pre><code id="result" style="overflow: scroll;"></code></pre>
</div>`;

    export {htmlContent, adminAccounts};
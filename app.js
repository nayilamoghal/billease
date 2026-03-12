// ========== DATA STORE ==========
// Data is now stored permanently in Python backend (SQLite database)
// localStorage is no longer used for customers, invoices, or products

let customers = [];
let invoices  = [];
let products  = [];

const defaultProducts = [
  // ── ELECTRONICS (10) ──
  { id:'P001', name:'Laptop',              price:55000, category:'Electronics', unit:'Piece', hsn:'84713010', stock:'', desc:'High performance laptop' },
  { id:'P002', name:'Smartphone',          price:15000, category:'Electronics', unit:'Piece', hsn:'85171200', stock:'', desc:'Android smartphone' },
  { id:'P003', name:'Headphones',          price:1200,  category:'Electronics', unit:'Piece', hsn:'85183000', stock:'', desc:'Over-ear headphones' },
  { id:'P004', name:'Bluetooth Speaker',   price:2500,  category:'Electronics', unit:'Piece', hsn:'85182200', stock:'', desc:'Portable bluetooth speaker' },
  { id:'P005', name:'Wireless Mouse',      price:700,   category:'Electronics', unit:'Piece', hsn:'84716060', stock:'', desc:'Wireless computer mouse' },
  { id:'P006', name:'Keyboard',            price:900,   category:'Electronics', unit:'Piece', hsn:'84716040', stock:'', desc:'USB mechanical keyboard' },
  { id:'P007', name:'USB Cable',           price:250,   category:'Electronics', unit:'Piece', hsn:'85444290', stock:'', desc:'USB-C data & charging cable' },
  { id:'P008', name:'Power Bank 10000mAh', price:1500,  category:'Electronics', unit:'Piece', hsn:'85076000', stock:'', desc:'10000mAh portable power bank' },
  { id:'P009', name:'Pendrive 32GB',       price:600,   category:'Electronics', unit:'Piece', hsn:'84717090', stock:'', desc:'32GB USB 3.0 pen drive' },
  { id:'P010', name:'Smart Watch',         price:4500,  category:'Electronics', unit:'Piece', hsn:'91021900', stock:'', desc:'Fitness smart watch' },
  { id:'P011', name:'Tablet 10 inch',      price:18000, category:'Electronics', unit:'Piece', hsn:'84713020', stock:'', desc:'Android 10" tablet' },
  { id:'P012', name:'Webcam HD',           price:1800,  category:'Electronics', unit:'Piece', hsn:'85258030', stock:'', desc:'1080p HD webcam' },

  // ── CLOTHING (7) ──
  { id:'P013', name:"Men's T-Shirt",       price:399,   category:'Clothing', unit:'Piece', hsn:'61091000', stock:'', desc:'100% cotton round neck T-shirt' },
  { id:'P014', name:"Women's Kurti",       price:699,   category:'Clothing', unit:'Piece', hsn:'62044200', stock:'', desc:'Printed cotton kurti' },
  { id:'P015', name:'Jeans (Men)',         price:1299,  category:'Clothing', unit:'Piece', hsn:'62034200', stock:'', desc:'Regular fit denim jeans' },
  { id:'P016', name:'Formal Shirt',        price:899,   category:'Clothing', unit:'Piece', hsn:'62052000', stock:'', desc:"Men's cotton formal shirt" },
  { id:'P017', name:'Saree',               price:2500,  category:'Clothing', unit:'Piece', hsn:'54071000', stock:'', desc:'Silk blend traditional saree' },
  { id:'P018', name:'Kids T-Shirt',        price:299,   category:'Clothing', unit:'Piece', hsn:'61112000', stock:'', desc:'Soft cotton kids T-shirt' },
  { id:'P019', name:'Winter Jacket',       price:2200,  category:'Clothing', unit:'Piece', hsn:'62011300', stock:'', desc:'Padded warm winter jacket' },

  // ── FOOD & BEVERAGES (7) ──
  { id:'P020', name:'Basmati Rice 5kg',    price:450,   category:'Food & Beverages', unit:'Kg',    hsn:'10063020', stock:'', desc:'Premium aged basmati rice' },
  { id:'P021', name:'Cooking Oil 1L',      price:180,   category:'Food & Beverages', unit:'Litre', hsn:'15079010', stock:'', desc:'Refined sunflower cooking oil' },
  { id:'P022', name:'Wheat Flour 10kg',    price:380,   category:'Food & Beverages', unit:'Kg',    hsn:'11010000', stock:'', desc:'Whole wheat atta flour' },
  { id:'P023', name:'Mineral Water 1L',    price:20,    category:'Food & Beverages', unit:'Litre', hsn:'22011010', stock:'', desc:'Packaged drinking water' },
  { id:'P024', name:'Cold Drink 600ml',    price:45,    category:'Food & Beverages', unit:'Piece', hsn:'22021010', stock:'', desc:'Carbonated soft drink' },
  { id:'P025', name:'Biscuit Pack',        price:30,    category:'Food & Beverages', unit:'Piece', hsn:'19053100', stock:'', desc:'Cream biscuit 100g pack' },
  { id:'P026', name:'Instant Noodles',     price:15,    category:'Food & Beverages', unit:'Piece', hsn:'19023010', stock:'', desc:'Masala flavour instant noodles' },

  // ── SOFTWARE (6) ──
  { id:'P027', name:'Antivirus 1 Year',    price:999,   category:'Software', unit:'Year',  hsn:'99831100', stock:'', desc:'PC antivirus 1 device 1 year' },
  { id:'P028', name:'MS Office License',   price:4999,  category:'Software', unit:'Year',  hsn:'99831100', stock:'', desc:'Microsoft Office 365 annual' },
  { id:'P029', name:'Tally ERP License',   price:18000, category:'Software', unit:'Year',  hsn:'99831100', stock:'', desc:'Tally ERP 9 business license' },
  { id:'P030', name:'Website Domain 1yr',  price:799,   category:'Software', unit:'Year',  hsn:'99831100', stock:'', desc:'.com domain registration 1 year' },
  { id:'P031', name:'Web Hosting 1yr',     price:3500,  category:'Software', unit:'Year',  hsn:'99831100', stock:'', desc:'Shared web hosting annual plan' },
  { id:'P032', name:'Mobile App (Basic)',  price:25000, category:'Software', unit:'Piece', hsn:'99831100', stock:'', desc:'Basic Android mobile app' },

  // ── SERVICES (7) ──
  { id:'P033', name:'Website Design',      price:15000, category:'Services', unit:'Piece', hsn:'99831100', stock:'', desc:'Static business website design' },
  { id:'P034', name:'Logo Design',         price:2500,  category:'Services', unit:'Piece', hsn:'99831100', stock:'', desc:'Professional brand logo design' },
  { id:'P035', name:'AC Service',          price:500,   category:'Services', unit:'Piece', hsn:'99851210', stock:'', desc:'Air conditioner servicing & gas' },
  { id:'P036', name:'Computer Repair',     price:800,   category:'Services', unit:'Piece', hsn:'99851910', stock:'', desc:'Laptop/PC repair & cleaning' },
  { id:'P037', name:'Home Cleaning',       price:1200,  category:'Services', unit:'Piece', hsn:'99851010', stock:'', desc:'Full home deep cleaning service' },
  { id:'P038', name:'Plumber Visit',       price:400,   category:'Services', unit:'Piece', hsn:'99854100', stock:'', desc:'Plumbing repair home visit' },
  { id:'P039', name:'Electrician Visit',   price:350,   category:'Services', unit:'Piece', hsn:'99854200', stock:'', desc:'Electrical repair home visit' },

  // ── OTHER (6) ──
  { id:'P040', name:'Laptop Bag',          price:1200,  category:'Other', unit:'Piece', hsn:'42021200', stock:'', desc:'15.6 inch laptop carry bag' },
  { id:'P041', name:'Office Chair',        price:5500,  category:'Other', unit:'Piece', hsn:'94013000', stock:'', desc:'Ergonomic mesh office chair' },
  { id:'P042', name:'Study Table',         price:4200,  category:'Other', unit:'Piece', hsn:'94030010', stock:'', desc:'Wooden study/work table' },
  { id:'P043', name:'Notebook A4 (100pg)', price:60,    category:'Other', unit:'Piece', hsn:'48202000', stock:'', desc:'Single line 100 page notebook' },
  { id:'P044', name:'Pen (Pack of 10)',    price:50,    category:'Other', unit:'Set',   hsn:'96081000', stock:'', desc:'Ball point pen pack' },
  { id:'P045', name:'Printer Paper A4',    price:450,   category:'Other', unit:'Set',   hsn:'48025590', stock:'', desc:'500 sheet A4 printer paper ream' },
];

let editingCustomerId = null;
let editingProductId  = null;
let currentViewInvoice = null;

// ========== API BASE URL ==========
const API = 'http://localhost:5000/api';

// ========== API HELPERS ==========
async function apiGet(path) {
  const res = await fetch(API + path);
  return res.json();
}
async function apiPost(path, data) {
  const res = await fetch(API + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
async function apiDelete(path) {
  const res = await fetch(API + path, { method: 'DELETE' });
  return res.json();
}

// ========== LOAD ALL DATA FROM SERVER ==========
async function loadAllData() {
  try {
    [customers, invoices, products] = await Promise.all([
      apiGet('/customers'),
      apiGet('/invoices'),
      apiGet('/products'),
    ]);
    if (products.length === 0) {
      await apiPost('/products/bulk', defaultProducts);
      products = await apiGet('/products');
    }
    refreshDashboard();
  } catch(e) {
    toast('Cannot connect to Python server. Run: python app.py', 'error');
  }
}

// ========== NAVIGATION ==========
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const navIndex = ['dashboard','invoices','customers','products','reports'].indexOf(page);
  document.querySelectorAll('.nav-item')[navIndex].classList.add('active');
  const titles = { dashboard:'Dashboard', invoices:'Invoices', customers:'Customers', products:'Products & Services', reports:'Reports' };
  document.getElementById('pageTitle').textContent = titles[page];
  if (page === 'dashboard') refreshDashboard();
  if (page === 'invoices') renderInvoices();
  if (page === 'customers') renderCustomers();
  if (page === 'products') renderProducts();
  if (page === 'reports') renderReports();
}

// ========== TOAST ==========
function toast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show ' + (type === 'error' ? 'error' : '');
  setTimeout(() => t.className = '', 3000);
}

// ========== SAVE (kept for compatibility) ==========
async function saveData() {}

// ========== CUSTOMER FUNCTIONS ==========
function openCustomerModal(id = null) {
  editingCustomerId = id;
  document.getElementById('customerModalTitle').textContent = id ? 'Edit Customer' : 'Add New Customer';
  const fields = ['cName','cEmail','cPhone','cGst','cCity','cState','cAddress'];
  if (id) {
    const c = customers.find(x => x.id === id);
    document.getElementById('cName').value = c.name;
    document.getElementById('cEmail').value = c.email;
    document.getElementById('cPhone').value = c.phone;
    document.getElementById('cGst').value = c.gst;
    document.getElementById('cCity').value = c.city;
    document.getElementById('cState').value = c.state;
    document.getElementById('cAddress').value = c.address;
  } else {
    fields.forEach(f => document.getElementById(f).value = '');
  }
  document.getElementById('customerModal').classList.add('open');
}

async function saveCustomer() {
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  if (!name || !email) { toast('Name and Email are required!', 'error'); return; }
  const obj = {
    id: editingCustomerId || 'C' + Date.now(),
    name, email,
    phone: document.getElementById('cPhone').value,
    gst:   document.getElementById('cGst').value,
    city:  document.getElementById('cCity').value,
    state: document.getElementById('cState').value,
    address: document.getElementById('cAddress').value,
  };
  await apiPost('/customers', obj);
  if (editingCustomerId) {
    const idx = customers.findIndex(c => c.id === editingCustomerId);
    customers[idx] = obj;
    toast('Customer updated!');
  } else {
    customers.push(obj);
    toast('Customer added!');
  }
  closeModal('customerModal');
  renderCustomers();
}

async function deleteCustomer(id) {
  if (!confirm('Delete this customer?')) return;
  await apiDelete('/customers/' + id);
  customers = customers.filter(c => c.id !== id);
  renderCustomers();
  toast('Customer deleted.');
}

function renderCustomers(list = customers) {
  const tbody = document.getElementById('customersTable');
  if (!list.length) { tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:40px">No customers yet.</td></tr>`; return; }
  const colors = ['#f0b429','#4a9eff','#2ecc8e','#9b6dff','#e07b2a'];
  tbody.innerHTML = list.map((c,i) => {
    const invCount = invoices.filter(inv => inv.customerId === c.id).length;
    const col = colors[i % colors.length];
    return `<tr>
      <td><div class="flex items-center gap-2">
        <div class="avatar" style="background:${col}20;color:${col}">${c.name[0].toUpperCase()}</div>
        <span>${c.name}</span>
      </div></td>
      <td>${c.email}</td>
      <td>${c.phone || '—'}</td>
      <td style="font-size:12px;color:var(--muted)">${c.gst || '—'}</td>
      <td>${c.city || '—'}</td>
      <td><span class="badge badge-blue">${invCount} invoices</span></td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm" onclick="openCustomerModal('${c.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${c.id}')">🗑</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function filterCustomers() {
  const q = document.getElementById('customerSearch').value.toLowerCase();
  renderCustomers(customers.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.city||'').toLowerCase().includes(q)));
}

// ========== INVOICE FUNCTIONS ==========
let itemCount = 0;

function openInvoiceModal() {
  itemCount = 0;
  document.getElementById('itemsBody').innerHTML = '';
  document.getElementById('invDate').value = new Date().toISOString().slice(0,10);
  const due = new Date(); due.setDate(due.getDate() + 30);
  document.getElementById('invDue').value = due.toISOString().slice(0,10);
  document.getElementById('invStatus').value = 'Pending';
  document.getElementById('invNotes').value = '';
  document.getElementById('invGstRate').value = '18';
  document.getElementById('subtotalDisp').textContent = '₹0.00';
  document.getElementById('gstDisp').textContent = '₹0.00';
  document.getElementById('totalDisp').textContent = '₹0.00';
  const sel = document.getElementById('invCustomer');
  sel.innerHTML = '<option value="">-- Select Customer --</option>' +
    customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  addItem();
  document.getElementById('invoiceModal').classList.add('open');
}

function addItem() {
  itemCount++;
  const id = 'item_' + itemCount;
  const productOptions = products.map(p =>
    `<option value="${p.id}" data-price="${p.price}" data-name="${p.name}">${p.name} — ₹${parseFloat(p.price).toFixed(2)}</option>`
  ).join('');
  const tr = document.createElement('tr');
  tr.id = id;
  tr.innerHTML = `
    <td>
      <select onchange="onProductSelect(this,'${id}')" style="min-width:140px">
        <option value="">-- Select Product --</option>
        ${productOptions}
        <option value="__custom__">✏️ Custom Item</option>
      </select>
    </td>
    <td><input type="text" placeholder="Description" oninput="recalc()" class="item-desc"></td>
    <td><input type="number" value="1" min="1" style="width:65px" oninput="recalc()" class="item-qty"></td>
    <td><input type="number" value="0" min="0" style="width:90px" oninput="recalc()" class="item-price"></td>
    <td><input type="number" value="0" readonly style="width:90px;background:transparent;border-color:transparent;color:var(--accent)" class="item-amount"></td>
    <td><button class="btn btn-danger btn-sm" onclick="removeItem('${id}')">✕</button></td>
  `;
  document.getElementById('itemsBody').appendChild(tr);
  recalc();
}

function onProductSelect(sel, rowId) {
  const row = document.getElementById(rowId);
  const descInput = row.querySelector('.item-desc');
  const priceInput = row.querySelector('.item-price');
  const opt = sel.options[sel.selectedIndex];
  if (sel.value === '__custom__' || sel.value === '') {
    priceInput.value = '0';
    priceInput.readOnly = false;
    descInput.value = '';
  } else {
    const price = opt.getAttribute('data-price');
    const name  = opt.getAttribute('data-name');
    priceInput.value = parseFloat(price).toFixed(2);
    priceInput.readOnly = true;
    descInput.value = name;
  }
  recalc();
}

function removeItem(id) {
  document.getElementById(id)?.remove();
  recalc();
}

function recalc() {
  const rows = document.querySelectorAll('#itemsBody tr');
  let sub = 0;
  rows.forEach(row => {
    const qty   = parseFloat(row.querySelector('.item-qty')?.value) || 0;
    const price = parseFloat(row.querySelector('.item-price')?.value) || 0;
    const amt   = qty * price;
    const amtEl = row.querySelector('.item-amount');
    if (amtEl) amtEl.value = amt.toFixed(2);
    sub += amt;
  });
  const rate = parseFloat(document.getElementById('invGstRate').value) || 18;
  const gst = sub * rate / 100;
  const total = sub + gst;
  document.getElementById('subtotalDisp').textContent = '₹' + sub.toFixed(2);
  document.getElementById('gstDisp').textContent = '₹' + gst.toFixed(2);
  document.getElementById('totalDisp').textContent = '₹' + total.toFixed(2);
  document.getElementById('gstLabel').textContent = `GST (${rate}%)`;
}

function fillCustomerData() {}

async function saveInvoice() {
  const custId = document.getElementById('invCustomer').value;
  if (!custId) { toast('Please select a customer!', 'error'); return; }
  const rows = document.querySelectorAll('#itemsBody tr');
  const items = [];
  rows.forEach(row => {
    const desc  = row.querySelector('.item-desc')?.value?.trim();
    const qty   = parseFloat(row.querySelector('.item-qty')?.value) || 0;
    const price = parseFloat(row.querySelector('.item-price')?.value) || 0;
    const amount= parseFloat(row.querySelector('.item-amount')?.value) || 0;
    if (desc) items.push({ desc, qty, price, amount });
  });
  if (!items.length) { toast('Add at least one item!', 'error'); return; }
  const rate = parseFloat(document.getElementById('invGstRate').value);
  const subtotal = items.reduce((a,b) => a + b.amount, 0);
  const gst = subtotal * rate / 100;
  const inv = {
    id: 'INV-' + String(invoices.length + 1).padStart(4,'0'),
    customerId: custId,
    customerName: customers.find(c=>c.id===custId)?.name,
    date: document.getElementById('invDate').value,
    due: document.getElementById('invDue').value,
    status: document.getElementById('invStatus').value,
    notes: document.getElementById('invNotes').value,
    gstRate: rate,
    items, subtotal, gst, total: subtotal + gst,
  };
  await apiPost('/invoices', inv);
  invoices.push(inv);
  closeModal('invoiceModal');
  renderInvoices();
  refreshDashboard();
  toast('Invoice created! 🎉');
}

function renderInvoices(list = invoices) {
  const tbody = document.getElementById('invoicesTable');
  if (!list.length) { tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:40px">No invoices yet.</td></tr>`; return; }
  tbody.innerHTML = [...list].reverse().map(inv => `
    <tr>
      <td style="font-family:'Syne',sans-serif;color:var(--accent)">${inv.id}</td>
      <td>${inv.customerName}</td>
      <td>${formatDate(inv.date)}</td>
      <td>${formatDate(inv.due)}</td>
      <td>₹${inv.subtotal.toFixed(2)}</td>
      <td class="gst-tag">₹${inv.gst.toFixed(2)} <span style="font-size:10px">(${inv.gstRate}%)</span></td>
      <td style="font-weight:600;color:var(--accent)">₹${inv.total.toFixed(2)}</td>
      <td><span class="badge badge-${inv.status.toLowerCase()}">${inv.status}</span></td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm" onclick="viewInvoice('${inv.id}')">👁 View</button>
          <button class="btn btn-danger btn-sm" onclick="deleteInvoice('${inv.id}')">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterInvoices() {
  const q = document.getElementById('invoiceSearch').value.toLowerCase();
  const st = document.getElementById('statusFilter').value;
  renderInvoices(invoices.filter(inv =>
    (inv.id.toLowerCase().includes(q) || inv.customerName.toLowerCase().includes(q)) &&
    (!st || inv.status === st)
  ));
}

async function deleteInvoice(id) {
  if (!confirm('Delete invoice ' + id + '?')) return;
  await apiDelete('/invoices/' + id);
  invoices = invoices.filter(i => i.id !== id);
  renderInvoices();
  refreshDashboard();
  toast('Invoice deleted.');
}

function viewInvoice(id) {
  currentViewInvoice = invoices.find(i => i.id === id);
  if (!currentViewInvoice) return;
  const inv = currentViewInvoice;
  const c = customers.find(x => x.id === inv.customerId) || {};
  document.getElementById('invoicePreview').innerHTML = buildInvoiceHTML(inv, c);
  document.getElementById('viewModal').classList.add('open');
}

function buildInvoiceHTML(inv, c) {
  const statusColor = inv.status === 'Paid' ? '#2ecc8e' : inv.status === 'Overdue' ? '#e05c5c' : '#f0b429';
  return `
    <div style="padding:30px;background:#fff;color:#111;border-radius:10px;font-family:'DM Sans',sans-serif">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px">
        <div>
          <h1 style="font-family:'Syne',sans-serif;font-size:28px;color:#f0b429;margin:0">BillEase</h1>
          <p style="color:#666;font-size:12px;margin-top:4px">Billing & Invoice System</p>
        </div>
        <div style="text-align:right">
          <div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#111">${inv.id}</div>
          <div style="font-size:12px;color:#888;margin-top:4px">Date: ${formatDate(inv.date)}</div>
          <div style="font-size:12px;color:#888">Due: ${formatDate(inv.due)}</div>
          <div style="margin-top:8px;background:${statusColor}20;color:${statusColor};padding:4px 12px;border-radius:20px;display:inline-block;font-size:12px;font-weight:600">${inv.status}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px">
        <div style="background:#f8f8f8;padding:16px;border-radius:8px">
          <div style="font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Bill To</div>
          <div style="font-weight:700;font-size:15px">${c.name || inv.customerName}</div>
          <div style="font-size:13px;color:#555;margin-top:4px">${c.email || ''}</div>
          <div style="font-size:13px;color:#555">${c.phone || ''}</div>
          <div style="font-size:13px;color:#555">${c.address || ''}</div>
          ${c.gst ? `<div style="font-size:12px;color:#999;margin-top:4px">GST: ${c.gst}</div>` : ''}
        </div>
        <div style="background:#f8f8f8;padding:16px;border-radius:8px">
          <div style="font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">From</div>
          <div style="font-weight:700;font-size:15px">BillEase Company</div>
          <div style="font-size:13px;color:#555">billing@billease.com</div>
          <div style="font-size:13px;color:#555">+91 98765 43210</div>
          ${inv.notes ? `<div style="font-size:12px;color:#999;margin-top:8px">Note: ${inv.notes}</div>` : ''}
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <thead>
          <tr style="background:#111;color:#fff">
            <th style="padding:10px 14px;text-align:left;font-size:12px">#</th>
            <th style="padding:10px 14px;text-align:left;font-size:12px">Description</th>
            <th style="padding:10px 14px;text-align:right;font-size:12px">Qty</th>
            <th style="padding:10px 14px;text-align:right;font-size:12px">Unit Price</th>
            <th style="padding:10px 14px;text-align:right;font-size:12px">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${inv.items.map((item,i) => `
            <tr style="border-bottom:1px solid #eee">
              <td style="padding:10px 14px;font-size:13px;color:#888">${i+1}</td>
              <td style="padding:10px 14px;font-size:13px">${item.desc}</td>
              <td style="padding:10px 14px;font-size:13px;text-align:right">${item.qty}</td>
              <td style="padding:10px 14px;font-size:13px;text-align:right">₹${item.price.toFixed(2)}</td>
              <td style="padding:10px 14px;font-size:13px;text-align:right;font-weight:600">₹${item.amount.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div style="display:flex;justify-content:flex-end">
        <div style="width:260px">
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#666">
            <span>Subtotal</span><span>₹${inv.subtotal.toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#666">
            <span>CGST (${inv.gstRate/2}%)</span><span>₹${(inv.gst/2).toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px;color:#666">
            <span>SGST (${inv.gstRate/2}%)</span><span>₹${(inv.gst/2).toFixed(2)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:12px 0;font-size:18px;font-weight:800;border-top:2px solid #111;margin-top:6px;color:#111">
            <span>Total</span><span style="color:#f0b429">₹${inv.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;text-align:center;font-size:11px;color:#bbb">
        Thank you for your business! • Generated by BillEase
      </div>
    </div>
  `;
}

async function downloadPDF() {
  if (!currentViewInvoice) return;
  const { jsPDF } = window.jspdf;
  const inv = currentViewInvoice;
  const c = customers.find(x => x.id === inv.customerId) || {};
  const doc = new jsPDF({ format: 'a4' });
  const W = 210; let y = 20;
  doc.setFillColor(240,180,41);
  doc.rect(0,0,W,14,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(20); doc.setTextColor(0,0,0);
  doc.text('BillEase', 14, 10);
  doc.setFontSize(9); doc.setTextColor(60,60,60);
  doc.text('Billing & Invoice System', 14, 18);
  doc.setFont('helvetica','bold'); doc.setFontSize(22); doc.setTextColor(30,30,30);
  doc.text(inv.id, W-14, 18, {align:'right'});
  y = 30;
  doc.setFontSize(9); doc.setTextColor(120,120,120);
  doc.text(`Date: ${formatDate(inv.date)}  |  Due: ${formatDate(inv.due)}  |  Status: ${inv.status}`, W-14, y, {align:'right'});
  y = 40;
  doc.setFillColor(248,248,248); doc.roundedRect(14,y,85,40,2,2,'F');
  doc.roundedRect(111,y,85,40,2,2,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(7); doc.setTextColor(150,150,150);
  doc.text('BILL TO', 20, y+7); doc.text('FROM', 117, y+7);
  doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(30,30,30);
  doc.text(c.name || inv.customerName, 20, y+14);
  doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(80,80,80);
  doc.text(c.email || '', 20, y+20);
  doc.text(c.phone || '', 20, y+26);
  if (c.gst) doc.text('GST: ' + c.gst, 20, y+32);
  doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(30,30,30);
  doc.text('BillEase Company', 117, y+14);
  doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(80,80,80);
  doc.text('billing@billease.com', 117, y+20);
  doc.text('+91 98765 43210', 117, y+26);
  y = 90;
  doc.setFillColor(30,30,30); doc.rect(14,y,W-28,8,'F');
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(255,255,255);
  doc.text('#', 18, y+5.5); doc.text('Description', 28, y+5.5); doc.text('Qty', 130, y+5.5);
  doc.text('Unit Price', 150, y+5.5); doc.text('Amount', W-20, y+5.5, {align:'right'});
  y += 12;
  inv.items.forEach((item,i) => {
    if (i%2===0) { doc.setFillColor(250,250,250); doc.rect(14,y-4,W-28,8,'F'); }
    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(50,50,50);
    doc.text(String(i+1), 18, y+1);
    doc.text(item.desc.substring(0,45), 28, y+1);
    doc.text(String(item.qty), 132, y+1);
    doc.text('Rs ' + item.price.toFixed(2), 152, y+1);
    doc.setFont('helvetica','bold');
    doc.text('Rs ' + item.amount.toFixed(2), W-18, y+1, {align:'right'});
    y += 10;
  });
  y += 6;
  doc.setDrawColor(220,220,220); doc.line(120, y, W-14, y); y += 6;
  doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(100,100,100);
  doc.text('Subtotal:', 130, y); doc.text('Rs ' + inv.subtotal.toFixed(2), W-16, y, {align:'right'}); y += 7;
  doc.text(`CGST (${inv.gstRate/2}%):`, 130, y); doc.text('Rs ' + (inv.gst/2).toFixed(2), W-16, y, {align:'right'}); y += 7;
  doc.text(`SGST (${inv.gstRate/2}%):`, 130, y); doc.text('Rs ' + (inv.gst/2).toFixed(2), W-16, y, {align:'right'}); y += 4;
  doc.setDrawColor(30,30,30); doc.setLineWidth(0.5); doc.line(120, y, W-14, y); y += 7;
  doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(30,30,30);
  doc.text('TOTAL:', 130, y);
  doc.setTextColor(240,180,41); doc.text('Rs ' + inv.total.toFixed(2), W-16, y, {align:'right'});
  doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(180,180,180);
  doc.text('Thank you for your business! • Generated by BillEase', W/2, 285, {align:'center'});
  doc.save(inv.id + '.pdf');
  toast('PDF downloaded! ✅');
}

// ========== PRODUCT FUNCTIONS ==========
function openProductModal(id = null) {
  editingProductId = id;
  document.getElementById('productModalTitle').textContent = id ? 'Edit Product' : 'Add New Product';
  if (id) {
    const p = products.find(x => x.id === id);
    document.getElementById('pName').value = p.name;
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pCategory').value = p.category;
    document.getElementById('pUnit').value = p.unit;
    document.getElementById('pHsn').value = p.hsn;
    document.getElementById('pStock').value = p.stock;
    document.getElementById('pDesc').value = p.desc;
  } else {
    ['pName','pPrice','pHsn','pStock','pDesc'].forEach(f => document.getElementById(f).value = '');
    document.getElementById('pCategory').value = 'Electronics';
    document.getElementById('pUnit').value = 'Piece';
  }
  document.getElementById('productModal').classList.add('open');
}

async function saveProduct() {
  const name  = document.getElementById('pName').value.trim();
  const price = document.getElementById('pPrice').value;
  if (!name || price === '') { toast('Product name and price are required!', 'error'); return; }
  const obj = {
    id:       editingProductId || 'P' + Date.now(),
    name,
    price:    parseFloat(price),
    category: document.getElementById('pCategory').value,
    unit:     document.getElementById('pUnit').value,
    hsn:      document.getElementById('pHsn').value,
    stock:    document.getElementById('pStock').value,
    desc:     document.getElementById('pDesc').value,
  };
  await apiPost('/products', obj);
  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    products[idx] = obj;
    toast('Product updated!');
  } else {
    products.push(obj);
    toast('Product added! ✅');
  }
  closeModal('productModal');
  renderProducts();
}

async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  await apiDelete('/products/' + id);
  products = products.filter(p => p.id !== id);
  renderProducts();
  toast('Product deleted.');
}

const catColors = { Electronics:'#4a9eff', Clothing:'#9b6dff', 'Food & Beverages':'#2ecc8e', Software:'#f0b429', Services:'#e07b2a', Other:'#7a8099' };

function renderProducts(list = products) {
  const tbody = document.getElementById('productsTable');
  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:40px">No products yet. Add your first product!</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(p => {
    const col = catColors[p.category] || '#7a8099';
    return `<tr>
      <td><div class="flex items-center gap-2">
        <div class="avatar" style="background:${col}20;color:${col};font-size:16px">📦</div>
        <strong>${p.name}</strong>
      </div></td>
      <td><span class="badge" style="background:${col}20;color:${col}">${p.category}</span></td>
      <td style="color:var(--muted)">${p.unit}</td>
      <td style="font-family:'Syne',sans-serif;color:var(--accent);font-weight:700">₹${parseFloat(p.price).toFixed(2)}</td>
      <td style="font-size:12px;color:var(--muted)">${p.hsn || '—'}</td>
      <td style="font-size:13px;color:var(--muted);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.desc || '—'}</td>
      <td><div class="flex gap-2">
        <button class="btn btn-ghost btn-sm" onclick="openProductModal('${p.id}')">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">🗑</button>
      </div></td>
    </tr>`;
  }).join('');
}

function filterProducts() {
  const q   = document.getElementById('productSearch').value.toLowerCase();
  const cat = document.getElementById('catFilter').value;
  renderProducts(products.filter(p =>
    (p.name.toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q)) &&
    (!cat || p.category === cat)
  ));
}

// ========== DASHBOARD ==========
let revenueChartObj = null, statusChartObj = null;

function refreshDashboard() {
  const total = invoices.reduce((a,b) => a + b.total, 0);
  const pending = invoices.filter(i=>i.status==='Pending').reduce((a,b)=>a+b.total,0);
  document.getElementById('stat-revenue').textContent = '₹' + total.toLocaleString('en-IN', {maximumFractionDigits:0});
  document.getElementById('stat-invoices').textContent = invoices.length;
  document.getElementById('stat-customers').textContent = customers.length;
  document.getElementById('stat-pending').textContent = '₹' + pending.toLocaleString('en-IN', {maximumFractionDigits:0});
  const tbody = document.getElementById('recentInvoicesTable');
  const recent = [...invoices].reverse().slice(0,5);
  if (!recent.length) { tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:30px">No invoices yet.</td></tr>`; }
  else tbody.innerHTML = recent.map(inv => `
    <tr>
      <td style="color:var(--accent);font-family:'Syne',sans-serif">${inv.id}</td>
      <td>${inv.customerName}</td>
      <td>${formatDate(inv.date)}</td>
      <td>₹${inv.total.toFixed(2)}</td>
      <td><span class="badge badge-${inv.status.toLowerCase()}">${inv.status}</span></td>
    </tr>
  `).join('');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthly = Array(12).fill(0);
  invoices.forEach(inv => { const m = new Date(inv.date).getMonth(); monthly[m] += inv.total; });
  if (revenueChartObj) revenueChartObj.destroy();
  const rCtx = document.getElementById('revenueChart').getContext('2d');
  revenueChartObj = new Chart(rCtx, {
    type: 'bar',
    data: { labels: months, datasets: [{ label: 'Revenue (₹)', data: monthly, backgroundColor: 'rgba(240,180,41,0.7)', borderColor: '#f0b429', borderWidth: 1, borderRadius: 5 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7a8099' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7a8099' } } } }
  });
  const paid = invoices.filter(i=>i.status==='Paid').length;
  const pend = invoices.filter(i=>i.status==='Pending').length;
  const over = invoices.filter(i=>i.status==='Overdue').length;
  if (statusChartObj) statusChartObj.destroy();
  const sCtx = document.getElementById('statusChart').getContext('2d');
  statusChartObj = new Chart(sCtx, {
    type: 'doughnut',
    data: { labels: ['Paid','Pending','Overdue'], datasets: [{ data: [paid, pend, over], backgroundColor: ['#2ecc8e','#f0b429','#e05c5c'], borderWidth: 0, hoverOffset: 6 }] },
    options: { responsive: true, cutout: '72%', plugins: { legend: { labels: { color: '#7a8099', font: { size: 12 } } } } }
  });
}

// ========== REPORTS ==========
let topCustChart = null, gstChartObj = null;

function renderReports() {
  const gstTotal = invoices.reduce((a,b) => a + b.gst, 0);
  const paid = invoices.filter(i=>i.status==='Paid').reduce((a,b) => a+b.total, 0);
  const overdue = invoices.filter(i=>i.status==='Overdue').reduce((a,b) => a+b.total, 0);
  document.getElementById('rep-totalGst').textContent = '₹' + gstTotal.toFixed(2);
  document.getElementById('rep-paid').textContent = '₹' + paid.toFixed(2);
  document.getElementById('rep-overdue').textContent = '₹' + overdue.toFixed(2);
  const custRev = {};
  invoices.forEach(inv => { custRev[inv.customerName] = (custRev[inv.customerName] || 0) + inv.total; });
  const sorted = Object.entries(custRev).sort((a,b)=>b[1]-a[1]).slice(0,6);
  if (topCustChart) topCustChart.destroy();
  const tcCtx = document.getElementById('topCustomersChart').getContext('2d');
  topCustChart = new Chart(tcCtx, {
    type: 'bar',
    data: { labels: sorted.map(s=>s[0]), datasets: [{ label: 'Revenue (₹)', data: sorted.map(s=>s[1]), backgroundColor: ['#f0b429','#4a9eff','#2ecc8e','#9b6dff','#e07b2a','#e05c5c'], borderRadius: 5, borderWidth: 0 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7a8099' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7a8099' } } } }
  });
  const netTotal = invoices.reduce((a,b) => a + b.subtotal, 0);
  if (gstChartObj) gstChartObj.destroy();
  const gCtx = document.getElementById('gstChart').getContext('2d');
  gstChartObj = new Chart(gCtx, {
    type: 'pie',
    data: { labels: ['Net Revenue', 'GST Collected'], datasets: [{ data: [netTotal, gstTotal], backgroundColor: ['#4a9eff','#f0b429'], borderWidth: 0, hoverOffset: 6 }] },
    options: { responsive: true, plugins: { legend: { labels: { color: '#7a8099' } } } }
  });
  const tbody = document.getElementById('reportTable');
  if (!invoices.length) { tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:30px">No data yet.</td></tr>`; return; }
  tbody.innerHTML = [...invoices].reverse().map(inv => `
    <tr>
      <td style="color:var(--accent);font-family:'Syne',sans-serif">${inv.id}</td>
      <td>${inv.customerName}</td>
      <td>${formatDate(inv.date)}</td>
      <td>₹${inv.subtotal.toFixed(2)}</td>
      <td>₹${inv.gst.toFixed(2)} <span class="gst-tag">(${inv.gstRate}%)</span></td>
      <td style="font-weight:600;color:var(--accent)">₹${inv.total.toFixed(2)}</td>
      <td><span class="badge badge-${inv.status.toLowerCase()}">${inv.status}</span></td>
    </tr>
  `).join('');
}

// ========== UTILS ==========
function formatDate(d) {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});

document.getElementById('dateDisplay').textContent = new Date().toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric'});

// ========== INIT — Load all data from Python backend ==========
loadAllData();

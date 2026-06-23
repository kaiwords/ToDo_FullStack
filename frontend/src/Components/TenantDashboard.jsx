import { useState, useEffect } from 'react';
import PerformanceForm from './PerformanceForm';
import PerformanceChart from './PerformanceChart';

const emptyLeaseholder = { name: '', email: '', phone: '' };
const emptyTenant = { name: '', email: '', phone: '', currentLeaseholderId: '' };

export default function TenantDashboard() {
  const [tenants, setTenants] = useState([]);
  const [leaseholders, setLeaseholders] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState('');
  const [view, setView] = useState('charts');

  const [newLeaseholder, setNewLeaseholder] = useState(emptyLeaseholder);
  const [newTenant, setNewTenant] = useState(emptyTenant);

  useEffect(() => {
    fetch('/leaseholders').then(r => r.json()).then(setLeaseholders);
    fetch('/tenants').then(r => r.json()).then(setTenants);
  }, []);

  useEffect(() => {
    if (!selectedTenant) return;
    fetch(`/performance/${selectedTenant}`).then(r => r.json()).then(setPerformances);
  }, [selectedTenant]);

  const handlePerformanceSubmit = async (data) => {
    const res = await fetch('/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const newPerf = await res.json();
    setPerformances(prev => [newPerf, ...prev]);
    setSelectedTenant(String(data.tenantId));
    setView('charts');
  };

  const addLeaseholder = async (e) => {
    e.preventDefault();
    const res = await fetch('/leaseholders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLeaseholder),
    });
    const l = await res.json();
    setLeaseholders(prev => [...prev, l]);
    setNewLeaseholder(emptyLeaseholder);
  };

  const addTenant = async (e) => {
    e.preventDefault();
    const res = await fetch('/tenants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newTenant,
        currentLeaseholderId: newTenant.currentLeaseholderId ? parseInt(newTenant.currentLeaseholderId) : null,
      }),
    });
    const t = await res.json();
    setTenants(prev => [...prev, t]);
    setNewTenant(emptyTenant);
  };

  const tabStyle = (active) => ({
    marginRight: 8,
    padding: '6px 14px',
    cursor: 'pointer',
    background: active ? '#333' : '#eee',
    color: active ? '#fff' : '#333',
    border: 'none',
    borderRadius: 4,
  });

  return (
    <div>
      <h2>Tenant Performance</h2>

      <div style={{ marginBottom: 16 }}>
        <button style={tabStyle(view === 'charts')} onClick={() => setView('charts')}>View Reports</button>
        <button style={tabStyle(view === 'form')} onClick={() => setView('form')}>Submit Report</button>
        <button style={tabStyle(view === 'add')} onClick={() => setView('add')}>Add People</button>
      </div>

      {view === 'add' && (
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <h3>Add Leaseholder</h3>
            <form onSubmit={addLeaseholder}>
              <div style={{ marginBottom: 8 }}>
                <input placeholder="Name" value={newLeaseholder.name} required
                  onChange={e => setNewLeaseholder(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <input placeholder="Email" type="email" value={newLeaseholder.email} required
                  onChange={e => setNewLeaseholder(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <input placeholder="Phone (optional)" value={newLeaseholder.phone}
                  onChange={e => setNewLeaseholder(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <button type="submit">Add Leaseholder</button>
            </form>
            {leaseholders.length > 0 && (
              <ul style={{ marginTop: 12, paddingLeft: 16, fontSize: 13 }}>
                {leaseholders.map(l => <li key={l.id}>{l.name} — {l.email}</li>)}
              </ul>
            )}
          </div>

          <div>
            <h3>Add Tenant</h3>
            <form onSubmit={addTenant}>
              <div style={{ marginBottom: 8 }}>
                <input placeholder="Name" value={newTenant.name} required
                  onChange={e => setNewTenant(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <input placeholder="Email" type="email" value={newTenant.email} required
                  onChange={e => setNewTenant(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <input placeholder="Phone (optional)" value={newTenant.phone}
                  onChange={e => setNewTenant(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <select value={newTenant.currentLeaseholderId}
                  onChange={e => setNewTenant(p => ({ ...p, currentLeaseholderId: e.target.value }))}>
                  <option value="">-- Current Leaseholder (optional) --</option>
                  {leaseholders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <button type="submit">Add Tenant</button>
            </form>
            {tenants.length > 0 && (
              <ul style={{ marginTop: 12, paddingLeft: 16, fontSize: 13 }}>
                {tenants.map(t => <li key={t.id}>{t.name} — {t.email}</li>)}
              </ul>
            )}
          </div>
        </div>
      )}

      {view === 'form' && (
        <PerformanceForm tenants={tenants} leaseholders={leaseholders} onSubmit={handlePerformanceSubmit} />
      )}

      {view === 'charts' && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <label>Select Tenant: </label>
            <select value={selectedTenant} onChange={e => setSelectedTenant(e.target.value)}>
              <option value="">-- Select --</option>
              {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          {!selectedTenant && <p style={{ color: '#888' }}>Select a tenant to see their performance reports.</p>}

          {selectedTenant && performances.length === 0 && (
            <p style={{ color: '#888' }}>No reports submitted for this tenant yet.</p>
          )}

          {performances.map((p, i) => (
            <div key={p.id} style={{ marginBottom: 24, borderBottom: '1px solid #ddd', paddingBottom: 24 }}>
              {performances.length > 1 && (
                <p style={{ fontSize: 12, color: '#999' }}>Report #{performances.length - i} — {new Date(p.createdAt).toLocaleDateString()}</p>
              )}
              <PerformanceChart performance={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

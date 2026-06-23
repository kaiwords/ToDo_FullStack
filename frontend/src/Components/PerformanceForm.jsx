import { useState } from 'react';

const SCORE_FIELDS = [
  { key: 'financialScore',     label: 'Financial Reliability' },
  { key: 'propertyScore',      label: 'Property Care' },
  { key: 'complianceScore',    label: 'Compliance' },
  { key: 'lifestyleScore',     label: 'Lifestyle (general)' },
  { key: 'communicationScore', label: 'Communication' },
  { key: 'overallRating',      label: 'Overall Rating' },
];

const LIFESTYLE_FLAGS = [
  { key: 'smokes',             label: 'Smokes' },
  { key: 'drinks',             label: 'Drinks Alcohol' },
  { key: 'drugs',              label: 'Drug Use' },
  { key: 'pets',               label: 'Unauthorized Pets' },
  { key: 'noisyParties',       label: 'Noisy / Parties' },
  { key: 'unauthorizedGuests', label: 'Unauthorized Guests' },
];

const defaultForm = {
  tenantId: '',
  requestedById: '',
  submittedById: '',
  financialScore: 3,
  propertyScore: 3,
  complianceScore: 3,
  lifestyleScore: 3,
  communicationScore: 3,
  smokes: false,
  drinks: false,
  drugs: false,
  pets: false,
  noisyParties: false,
  unauthorizedGuests: false,
  wouldRentAgain: true,
  overallRating: 3,
  comments: '',
};

export default function PerformanceForm({ tenants, leaseholders, onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : isNaN(value) ? value : parseInt(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      tenantId: parseInt(form.tenantId),
      requestedById: parseInt(form.requestedById),
      submittedById: parseInt(form.submittedById),
    });
    setForm(defaultForm);
  };

  const ScoreRow = ({ label, name }) => (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: 'inline-block', width: 200 }}>{label}</label>
      {[1, 2, 3, 4, 5].map(s => (
        <label key={s} style={{ marginRight: 10 }}>
          <input type="radio" name={name} value={s} checked={form[name] === s} onChange={handle} />
          {' '}{s}
        </label>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, textAlign: 'left' }}>
      <h3>Submit Performance Report</h3>

      <div style={{ marginBottom: 10 }}>
        <label>Tenant: </label>
        <select name="tenantId" value={form.tenantId} onChange={handle} required>
          <option value="">-- Select Tenant --</option>
          {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Requested by (A_Leaseholder): </label>
        <select name="requestedById" value={form.requestedById} onChange={handle} required>
          <option value="">-- Select --</option>
          {leaseholders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Submitted by (B_Leaseholder): </label>
        <select name="submittedById" value={form.submittedById} onChange={handle} required>
          <option value="">-- Select --</option>
          {leaseholders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
      </div>

      <hr />
      <h4 style={{ marginBottom: 8 }}>Scores &nbsp;<span style={{ fontWeight: 'normal', fontSize: 13 }}>(1 = Poor, 5 = Excellent)</span></h4>
      {SCORE_FIELDS.map(f => <ScoreRow key={f.key} label={f.label} name={f.key} />)}

      <hr />
      <h4 style={{ marginBottom: 8 }}>Lifestyle Flags</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {LIFESTYLE_FLAGS.map(({ key, label }) => (
          <label key={key}>
            <input type="checkbox" name={key} checked={form[key]} onChange={handle} />
            {' '}{label}
          </label>
        ))}
      </div>

      <hr />
      <div style={{ marginBottom: 10 }}>
        <label>
          <input type="checkbox" name="wouldRentAgain" checked={form.wouldRentAgain} onChange={handle} />
          {' '}Would Rent Again
        </label>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Comments:</label>
        <textarea
          name="comments"
          value={form.comments}
          onChange={handle}
          rows={3}
          style={{ display: 'block', width: '100%', marginTop: 4 }}
          placeholder="Any additional notes..."
        />
      </div>

      <button type="submit">Submit Report</button>
    </form>
  );
}

import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const CATEGORIES = [
  { key: 'financialScore',     label: 'Financial',      color: '#4CAF50' },
  { key: 'propertyScore',      label: 'Property Care',  color: '#2196F3' },
  { key: 'complianceScore',    label: 'Compliance',     color: '#FF9800' },
  { key: 'lifestyleScore',     label: 'Lifestyle',      color: '#9C27B0' },
  { key: 'communicationScore', label: 'Communication',  color: '#F44336' },
];

const LIFESTYLE_FLAGS = [
  { key: 'smokes',             label: 'Smokes' },
  { key: 'drinks',             label: 'Drinks Alcohol' },
  { key: 'drugs',              label: 'Drug Use' },
  { key: 'pets',               label: 'Unauthorized Pets' },
  { key: 'noisyParties',       label: 'Noisy / Parties' },
  { key: 'unauthorizedGuests', label: 'Unauthorized Guests' },
];

export default function PerformanceChart({ performance }) {
  if (!performance) return null;

  const data = CATEGORIES.map(cat => ({
    name: cat.label,
    value: performance[cat.key],
    color: cat.color,
  }));

  const activeFlags = LIFESTYLE_FLAGS.filter(f => performance[f.key]);

  return (
    <div style={{ textAlign: 'center', padding: '16px 0' }}>
      <h3 style={{ marginBottom: 4 }}>{performance.tenant?.name}</h3>
      <p style={{ margin: '0 0 4px', fontSize: 13, color: '#555' }}>
        Requested by <strong>{performance.requestedBy?.name}</strong> &nbsp;|&nbsp;
        Submitted by <strong>{performance.submittedBy?.name}</strong>
      </p>

      <PieChart width={420} height={300} style={{ margin: '0 auto' }}>
        <Pie
          data={data}
          cx={210}
          cy={140}
          outerRadius={120}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}/5`}
          labelLine={true}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}/5`, name]} />
        <Legend />
      </PieChart>

      <div style={{ marginTop: 8, fontSize: 15 }}>
        <strong>Overall:</strong> {performance.overallRating}/5 &nbsp;|&nbsp;
        <strong>Would Rent Again:</strong>{' '}
        {performance.wouldRentAgain ? '✅ Yes' : '❌ No'}
      </div>

      {activeFlags.length > 0 && (
        <div style={{ marginTop: 10, color: '#c62828', fontSize: 13 }}>
          <strong>Lifestyle Flags:</strong> {activeFlags.map(f => f.label).join(' · ')}
        </div>
      )}

      {performance.comments && (
        <div style={{ marginTop: 10, fontStyle: 'italic', color: '#444', fontSize: 13 }}>
          "{performance.comments}"
        </div>
      )}
    </div>
  );
}

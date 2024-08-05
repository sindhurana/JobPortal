import React from 'react';

export default function Hero() {
    return (
        <div style={{ padding: '40px 20px', backgroundColor: '#f0f4f8', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2c3e50', marginBottom: '20px' }}>Find your Dream Job!</h1>
            <h4 style={{ fontSize: '1.75rem', color: '#34495e', marginBottom: '20px' }}>Most Efficient Recruitment Solution</h4>
            <div
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #3498db', // Border color
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#eaf2f8'; // Hover background color
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'; // Hover shadow
                    e.currentTarget.style.transform = 'scale(1.02)'; // Hover scale
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff'; // Original background color
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; // Original shadow
                    e.currentTarget.style.transform = 'scale(1)'; // Original scale
                }}
            >
                <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6', margin: '0' }}>
                    This is the most comprehensive career management website that provides opportunities with jobs and helps you build capability with skills. For the recruiter, it is a one-stop destination to find up-skilled candidates.
                </p>
            </div>
        </div>
    );
}

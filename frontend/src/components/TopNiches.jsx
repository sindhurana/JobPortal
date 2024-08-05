import React from 'react';

export default function TopNiches() {
    const services = [
        {
            id: 1,
            service: "Software Development",
            description: "We provide software development services"
        },
        {
            id: 2,
            service: "Web Development",
            description: "We provide web development services"
        },
        {
            id: 3,
            service: "Data Science",
            description: "We provide Data services"
        },
        {
            id: 4,
            service: "Cloud Computing",
            description: "We provide cloud services"
        },
        {
            id: 5,
            service: "DevOps",
            description: "We provide DevOps services"
        },
        {
            id: 6,
            service: "Mobile App Development",
            description: "We provide mobile app development services"
        }
    ];

    const cardColors = [
        '#e3f2fd', // light blue
        '#ffccbc', // light red
        '#b2ebf2', // light cyan
        '#ffecb3', // light yellow
        '#d1c4e9', // light purple
        '#c8e6c9'  // light green
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f4f8' }}>
            <center><h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '2rem' }}>Top Niches</h3></center>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {
                    services.map((element, index) => {
                        return (
                            <div
                                style={{
                                    flex: '1 1 calc(33% - 20px)',
                                    backgroundColor: cardColors[index % cardColors.length],
                                    margin: '10px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                key={element.id}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                                }}
                                className="card w-95 mb-5 p-3 m-2"
                            >
                                <div className="card-body" style={{ padding: '20px', textAlign: 'center' }}>
                                    <h5 className="card-title" style={{ marginTop: '10px', color: '#333' }}>{element.service}</h5>
                                    <p className="card-text" style={{ color: '#555' }}>{element.description}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

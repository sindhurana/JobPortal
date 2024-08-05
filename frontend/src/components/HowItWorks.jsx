import React from 'react';
import { MdOutlineCreateNewFolder, MdScreenSearchDesktop } from "react-icons/md";
import { BsFillSignpostFill } from "react-icons/bs";

export default function HowItWorks() {
    return (
        <section style={{ padding: '20px', backgroundColor: '#f0f4f8' }}>
            <center><h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '2rem' }}>How does it work?</h3></center>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{
                    flex: '1 1 calc(33% - 20px)',
                    backgroundColor: '#ffe082',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                }}
                    className="card"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                >
                    <div className="card-body" style={{ padding: '20px', textAlign: 'center' }}>
                        <MdOutlineCreateNewFolder style={{ fontSize: '2rem', color: '#ff9800' }} />
                        <h5 className="card-title" style={{ marginTop: '10px', color: '#333' }}>Create an Account!</h5>
                        <p className="card-text" style={{ color: '#555' }}>Sign up for a free account as a Job-Seeker or Employer</p>
                    </div>
                </div>

                <div style={{
                    flex: '1 1 calc(33% - 20px)',
                    backgroundColor: '#ffccbc',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                }}
                    className="card"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                >
                    <div className="card-body" style={{ padding: '20px', textAlign: 'center' }}>
                        <BsFillSignpostFill style={{ fontSize: '2rem', color: '#ff5722' }} />
                        <h5 className="card-title" style={{ marginTop: '10px', color: '#333' }}>Post or Browse Jobs</h5>
                        <p className="card-text" style={{ color: '#555' }}>Job-Seekers can search jobs & Employers can post jobs.</p>
                    </div>
                </div>

                <div style={{
                    flex: '1 1 calc(33% - 20px)',
                    backgroundColor: '#b2ebf2',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                }}
                    className="card"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                >
                    <div className="card-body" style={{ padding: '20px', textAlign: 'center' }}>
                        <MdScreenSearchDesktop style={{ fontSize: '2rem', color: '#00bcd4' }} />
                        <h5 className="card-title" style={{ marginTop: '10px', color: '#333' }}>Hire or Get Hired!</h5>
                        <p className="card-text" style={{ color: '#555' }}>Shortlist candidates or search for your dream job.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

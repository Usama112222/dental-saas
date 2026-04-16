// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import Navbar from '../components/home/Navbar';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import DoctorsSection from '../components/home/DoctorsSection';
import TreatmentsSection from '../components/home/TreatmentsSection';
import BookingSection from '../components/home/BookingSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactSection from '../components/home/ContactSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/home/Footer';
import BookingForm from '../components/home/BookingForm';

const Home = () => {
    const [doctors, setDoctors] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedTreatment, setSelectedTreatment] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            
            const [doctorsRes, treatmentsRes] = await Promise.all([
                axiosInstance.get('/doctors'),
                axiosInstance.get('/treatments')
            ]);
            
            setDoctors(doctorsRes.data.data || []);
            setTreatments(treatmentsRes.data.data || []);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setSelectedTreatment(null);
        setShowBookingForm(true);
    };

    const handleBookTreatment = (treatment) => {
        setSelectedTreatment(treatment);
        setSelectedDoctor(null);
        setShowBookingForm(true);
    };

    const handleBookingSuccess = () => {
        loadData();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            
            {/* Hero Section - First Impression */}
            <HeroSection />
            
            {/* About Section - Who We Are */}
            <div id="about">
                <AboutSection />
            </div>
            
            {/* Stats Section - Social Proof */}
            <StatsSection />
            
            {/* Features Section - What We Offer */}
            <FeaturesSection />
            
            {/* Doctors Section - Our Team */}
            <div id="doctors">
                <DoctorsSection 
                    doctors={doctors} 
                    onBookDoctor={handleBookDoctor}
                />
            </div>
            
            {/* Treatments Section - Our Services */}
            <div id="treatments">
                <TreatmentsSection 
                    treatments={treatments}
                    onBookTreatment={handleBookTreatment}
                />
            </div>
            
            {/* Booking Section - Call to Action */}
            <div id="booking">
                <BookingSection />
            </div>
            
            {/* Testimonials Section - Social Proof */}
            <div id="testimonials">
                <TestimonialsSection />
            </div>
            
            {/* Contact Section - Get in Touch */}
            <div id="contact">
                <ContactSection />
            </div>
            
            {/* CTA Section - Final Call to Action */}
            <CTASection />
            
            {/* Footer */}
            <Footer />

            {/* Booking Form Modal */}
            <BookingForm
                isOpen={showBookingForm}
                onClose={() => setShowBookingForm(false)}
                selectedDoctor={selectedDoctor}
                selectedTreatment={selectedTreatment}
                onSuccess={handleBookingSuccess}
            />
        </div>
    );
};

export default Home;
import { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactLeadForm from '../components/ContactLeadForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the OrangeFlow.in team.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-16">
        <div className="container-sm">
          <div className="mb-10 pt-16 text-center">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-[#111111]">
              Get in <span className="font-serif italic font-normal">touch</span>
            </h1>
            <p className="mt-3 text-[#6B7280]">
              Send a note and we will reply within one business day.
            </p>
          </div>

          <ContactLeadForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

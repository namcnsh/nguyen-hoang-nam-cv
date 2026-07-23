// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

const socialLinks = [
  { href: personalData.github, icon: IoLogoGithub, label: 'GitHub' },
  { href: personalData.linkedIn, icon: BiLogoLinkedin, label: 'LinkedIn' },
  { href: personalData.twitter, icon: FaXTwitter, label: 'X' },
  { href: personalData.stackOverflow, icon: FaStackOverflow, label: 'Stack Overflow' },
  { href: personalData.facebook, icon: FaFacebook, label: 'Facebook' },
].filter((item) => item.href);

const contactPhoneHref = `tel:+84${personalData.phone.replace(/^0/, '')}`;

const contactItems = [
  { icon: MdAlternateEmail, value: personalData.email, label: 'Email', href: `mailto:${personalData.email}` },
  { icon: IoMdCall, value: personalData.phone, label: 'Điện thoại', href: contactPhoneHref },
  { icon: CiLocationOn, value: personalData.address, label: 'Địa chỉ' },
];

function ContactSection() {
  return (
    <section id="contact" className="relative my-12 mt-24 text-white lg:my-24">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          Liên hệ
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-8">
          <ContactForm />
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-8">
          <div className="space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;

              const content = (
                <>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-blue-200">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 break-all text-sm leading-7 text-slate-200 md:text-base">
                      {item.value}
                    </p>
                  </div>
                </>
              );

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 outline-none transition focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-400/40"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  {content}
                </div>
              );
            })}
          </div>

          {socialLinks.length > 0 ? (
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Mạng xã hội
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.href}
                      aria-label={item.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-100 outline-none transition focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-400/40"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

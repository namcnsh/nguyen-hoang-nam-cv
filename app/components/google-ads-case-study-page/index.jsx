"use client";

import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useI18n } from "../i18n-provider";
import { googleAdsCaseStudyData } from "@/utils/data/google-ads-case-study";
import styles from "./google-ads-case-study.module.scss";

function numberFormatter(locale) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "vi-VN", { maximumFractionDigits: 0 });
}

function formatBillions(value, locale, currency = true) {
  const amount = new Intl.NumberFormat(locale === "en" ? "en-US" : "vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 1_000_000_000);
  if (currency) return locale === "en" ? `VND ${amount}B` : `${amount} tỷ ₫`;
  return locale === "en" ? `${amount}B` : `${amount} tỷ`;
}

function formatMillions(value, locale) {
  const amount = new Intl.NumberFormat(locale === "en" ? "en-US" : "vi-VN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 1_000_000);
  return locale === "en" ? `${amount}M` : `${amount} triệu`;
}

function formatQuarterSpend(value, locale) {
  if (value < 100_000_000) {
    const amount = formatMillions(value, locale);
    return locale === "en" ? `VND ${amount}` : `${amount} ₫`;
  }
  return formatBillions(value, locale);
}

function formatKpi(value, kind, locale) {
  if (kind === "spend") return formatBillions(value, locale);
  if (kind === "clicks") return formatMillions(value, locale);
  if (kind === "impressions") return formatBillions(value, locale, false);
  return numberFormatter(locale).format(value);
}

function formatSpend(value, locale) {
  const formatted = numberFormatter(locale).format(value);
  return locale === "en" ? `VND ${formatted}` : `${formatted} ₫`;
}

function formatQuarterLabel(label) {
  return label.replace(/(Q[1-4]) (20\d{2})/, (_, quarter, year) => `${quarter}’${year.slice(-2)}`);
}

function GoogleAdsCaseStudyPage() {
  const { dictionary, locale } = useI18n();
  const copy = dictionary.googleAdsCaseStudy;
  const { totals, quarters } = googleAdsCaseStudyData;
  const maxSpend = Math.max(...quarters.map((quarter) => quarter.spendVnd));
  const formatter = numberFormatter(locale);
  const kpis = [
    { key: "spend", value: totals.spendVnd, detail: copy.kpiLabels.campaignTotal },
    { key: "conversions", value: totals.conversions, detail: copy.kpiLabels.googleAdsRecorded },
    { key: "clicks", value: totals.clicks, detail: copy.kpiLabels.campaignTotal },
    { key: "impressions", value: totals.impressions, detail: copy.kpiLabels.campaignTotal },
  ];

  return (
    <article className={styles.page}>
      <div className={styles.backRow}>
        <Link href="/" className={styles.backLink}>
          <FaArrowLeft aria-hidden="true" size={12} />
          <span>{copy.back}</span>
        </Link>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.heroTitle}>{copy.title}</h1>
          <p className={styles.heroIntro}>{copy.intro}</p>
          <div className={styles.chips}>
            <span>{copy.period}</span>
            <span>{locale === "en" ? "VND 300,000–20,000,000" : "300.000–20.000.000 ₫"}</span>
          </div>
        </div>

        <figure className={styles.heroChart}>
          <figcaption className={styles.chartCaption}>{copy.heroChartTitle}</figcaption>
          <div className={styles.heroBars}>
            {quarters.map((quarter) => {
              const percent = (quarter.spendVnd / maxSpend) * 100;
              return (
                <div className={styles.heroBarRow} key={quarter.label}>
                  <span className={styles.heroQuarter}>{formatQuarterLabel(quarter.label)}</span>
                  <span className={styles.heroTrack} aria-hidden="true">
                    <span className={styles.heroFill} style={{ width: `${Math.max(percent, 1)}%` }} />
                  </span>
                  <span className={styles.heroAmount}>{formatQuarterSpend(quarter.spendVnd, locale)}</span>
                </div>
              );
            })}
          </div>
          <p className={styles.heroChartNote}>{copy.heroChartNote}</p>
        </figure>
      </header>

      <section className={styles.kpiSection} aria-labelledby="google-ads-kpis-title">
        <h2 id="google-ads-kpis-title" className={styles.srOnly}>{copy.sections.kpis}</h2>
        {kpis.map((kpi) => (
          <article className={styles.kpiCard} key={kpi.key}>
            <p className={styles.kpiLabel}>{copy.kpiLabels[kpi.key]}</p>
            <p className={styles.kpiValue}>{formatKpi(kpi.value, kpi.key, locale)}</p>
            <p className={styles.kpiDetail}>{kpi.detail}</p>
          </article>
        ))}
      </section>

      <div className={styles.contextGrid}>
        <section className={styles.panel} aria-labelledby="google-ads-context-title">
          <h2 id="google-ads-context-title" className={styles.sectionTitle}>{copy.sections.context}</h2>
          <p className={styles.bodyCopy}>{copy.context}</p>
          <p className={styles.roleLine}><span>{copy.roleLabel}</span><strong>{copy.role}</strong></p>
        </section>
        <section className={styles.panel} aria-labelledby="google-ads-execution-title">
          <h2 id="google-ads-execution-title" className={styles.sectionTitle}>{copy.sections.execution}</h2>
          <ol className={styles.executionList}>
            {copy.execution.map((item, index) => (
              <li key={item}>
                <span className={styles.executionIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className={styles.panel} aria-labelledby="google-ads-quarter-title">
        <div className={styles.sectionHeading}>
          <div>
            <h2 id="google-ads-quarter-title" className={styles.sectionTitle}>{copy.sections.timeline}</h2>
            <p className={styles.bodyCopy}>{copy.timelineIntro}</p>
          </div>
          <p className={styles.partialNote}>{copy.partialQuarterNote}</p>
        </div>
        <div className={styles.quarterList} role="table" aria-label={copy.sections.timeline}>
          <div className={`${styles.quarterRow} ${styles.quarterHeader}`} role="row">
            <span role="columnheader">{copy.quarterLabels.quarter}</span>
            <span role="columnheader">{copy.quarterLabels.spend}</span>
            <span role="columnheader">{copy.quarterLabels.conversions}</span>
            <span role="columnheader">{copy.quarterLabels.spendBar}</span>
          </div>
          {quarters.map((quarter) => {
            const percent = (quarter.spendVnd / maxSpend) * 100;
            return (
              <div className={styles.quarterRow} role="row" key={quarter.label}>
                <span className={styles.quarterName} role="cell">{quarter.label}</span>
                <span className={styles.quarterCell} role="cell">
                  <span className={styles.mobileLabel}>{copy.quarterLabels.spend}</span>{formatSpend(quarter.spendVnd, locale)}
                </span>
                <span className={styles.quarterCell} role="cell">
                  <span className={styles.mobileLabel}>{copy.quarterLabels.conversions}</span>{formatter.format(quarter.conversions)}
                </span>
                <span className={styles.quarterBarCell} role="cell" aria-label={`${copy.quarterLabels.spendBar}: ${formatSpend(quarter.spendVnd, locale)}`}>
                  <span className={styles.quarterTrack} aria-hidden="true">
                    <span className={styles.quarterFill} style={{ width: `${Math.max(percent, 1)}%` }} />
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="google-ads-sources-title">
        <h2 id="google-ads-sources-title" className={styles.sectionTitle}>{copy.sections.sources}</h2>
        <ul className={styles.sourceList}>
          {copy.sources.map((source) => <li key={source}>{source}</li>)}
        </ul>
      </section>

      <section className={styles.takeaway} aria-labelledby="google-ads-takeaway-title">
        <h2 id="google-ads-takeaway-title" className={styles.sectionTitle}>{copy.sections.takeaway}</h2>
        <p className={styles.takeawayCopy}>{copy.takeaway}</p>
        <Link className={styles.contactButton} href="/#contact">
          <span>{copy.contactCta}</span>
          <FaArrowRight aria-hidden="true" size={12} />
        </Link>
      </section>
    </article>
  );
}

export default GoogleAdsCaseStudyPage;

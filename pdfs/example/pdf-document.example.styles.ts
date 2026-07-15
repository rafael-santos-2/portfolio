// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

const PRIMARY = '#1C4ED8';
const PRIMARY_SOFT = '#EFF6FF';
const DARK = '#111827';
const MUTED = '#6B7280';
const BORDER = '#E5E7EB';
const BG_LIGHT = '#F9FAFB';
const WHITE = '#FFFFFF';

// ----------------------------------------------------------------------

export const s = StyleSheet.create({


  // ── Page ─────────────────────────────────────────────────────────────────────

  page: {
    paddingBottom: 52,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: WHITE,
  },


  // ── Header ───────────────────────────────────────────────────────────────────

  header: {
    paddingHorizontal: 40,
    paddingTop: 28,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: PRIMARY,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 8,
    color: MUTED,
    marginTop: 2,
    letterSpacing: 1,
  },
  badge: {
    borderWidth: 1.5,
    borderColor: PRIMARY,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-end',
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
  },
  badgeSub: {
    fontSize: 7,
    color: MUTED,
    marginTop: 2,
    letterSpacing: 0.8,
  },


  // ── Body ─────────────────────────────────────────────────────────────────────

  body: {
    paddingHorizontal: 40,
    paddingTop: 28,
  },


  // ── Info row ─────────────────────────────────────────────────────────────────

  infoRow: {
    flexDirection: 'row',
    marginBottom: 28,
    gap: 20,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  infoPrimary: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 2,
  },
  infoSecondary: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.5,
  },
  infoDivider: {
    width: 1,
    backgroundColor: BORDER,
  },


  // ── Table ─────────────────────────────────────────────────────────────────────

  sectionLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_SOFT,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  th: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
    letterSpacing: 0.5,
  },
  thNarrow: {
    width: 60,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
    letterSpacing: 0.5,
    textAlign: 'right',
  },
  tableRowEven: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  tableRowOdd: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: BG_LIGHT,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  td: {
    flex: 1,
    fontSize: 9.5,
    color: DARK,
  },
  tdNarrow: {
    width: 60,
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    textAlign: 'right',
  },
  tdMuted: {
    flex: 1,
    fontSize: 9.5,
    color: MUTED,
  },


  // ── Summary ───────────────────────────────────────────────────────────────────

  summarySection: {
    marginTop: 16,
    marginBottom: 28,
    alignItems: 'flex-end',
  },
  summaryBox: {
    width: 220,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  summaryLabel: {
    fontSize: 9,
    color: MUTED,
  },
  summaryValue: {
    fontSize: 9,
    color: DARK,
    fontFamily: 'Helvetica-Bold',
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: PRIMARY_SOFT,
    borderRadius: 4,
    marginTop: 2,
  },
  summaryTotalLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
  },
  summaryTotalValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
  },


  // ── Notes ─────────────────────────────────────────────────────────────────────

  notesBox: {
    borderLeftWidth: 3,
    borderLeftColor: PRIMARY,
    backgroundColor: BG_LIGHT,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 28,
  },
  notesLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  notesText: {
    fontSize: 9.5,
    color: DARK,
    lineHeight: 1.6,
  },


  // ── Footer ───────────────────────────────────────────────────────────────────

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: 40,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: MUTED,
  },
  footerBrand: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: PRIMARY,
    letterSpacing: 1,
  },
  pageNumber: {
    fontSize: 8,
    color: MUTED,
  },

});

/**
 * Buyer-visit data — public holidays, factory shutdown, hotels, travel hubs.
 * Used by Contact page Blocks 7, 8, 10.
 */

/**
 * Indonesian 2026 public holidays — Contact page Block 8.
 *
 * Source: anticipated SKB 3 Menteri 2026. Flagged as TODO until the
 * official decree is published and confirmed.
 */
export const holidays2026 = [
  { date: '2026-01-01', day: 'Thursday',  name: "New Year's Day" },
  { date: '2026-01-29', day: 'Thursday',  name: 'Isra Mi’raj' },
  { date: '2026-02-17', day: 'Tuesday',   name: 'Chinese New Year (Imlek)' },
  { date: '2026-03-19', day: 'Thursday',  name: 'Hindu Day of Silence (Nyepi)' },
  { date: '2026-03-21', day: 'Saturday',  name: 'Idul Fitri (day 1)' },
  { date: '2026-03-22', day: 'Sunday',    name: 'Idul Fitri (day 2)' },
  { date: '2026-04-03', day: 'Friday',    name: 'Good Friday' },
  { date: '2026-05-01', day: 'Friday',    name: 'Labour Day' },
  { date: '2026-05-14', day: 'Thursday',  name: 'Ascension Day' },
  { date: '2026-05-27', day: 'Wednesday', name: 'Idul Adha' },
  { date: '2026-05-31', day: 'Sunday',    name: 'Vesak Day (Waisak)' },
  { date: '2026-06-01', day: 'Monday',    name: 'Pancasila Day' },
  { date: '2026-06-17', day: 'Wednesday', name: 'Islamic New Year' },
  { date: '2026-08-17', day: 'Monday',    name: 'Independence Day' },
  { date: '2026-08-26', day: 'Wednesday', name: "Prophet's Birthday" },
  { date: '2026-12-25', day: 'Friday',    name: 'Christmas Day' },
] as const;

/** Lebaran (Idul Fitri) factory shutdown — Contact page Block 8. */
export const lebaranShutdown = {
  from: '2026-03-21',
  to: '2026-03-27',
  orderCutoff: '2026-03-15',
} as const;

/**
 * Recommended hotels for buyer visits — Contact page Block 10.
 * Tiered by star rating; Block 10 hides any tier with zero entries.
 */
export const hotels = [
  {
    name: 'TODO_PLACEHOLDER_GRAND_HOTEL_SEMARANG',
    stars: 5,
    distanceKm: 8,
    driveTimeMinutes: 20,
    description:
      'Premium five-star hotel near downtown Semarang with executive lounge and airport shuttle.',
    website: 'https://example.com/grand-hotel-semarang',
    mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_5_STAR_A',
  },
  {
    name: 'TODO_PLACEHOLDER_LUXE_TOWER_SEMARANG',
    stars: 5,
    distanceKm: 10,
    driveTimeMinutes: 25,
    description:
      'Five-star city tower with rooftop dining and conference facilities suitable for buyer meetings.',
    website: 'https://example.com/luxe-tower-semarang',
    mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_5_STAR_B',
  },
  {
    name: 'TODO_PLACEHOLDER_BUSINESS_HOTEL_SEMARANG',
    stars: 4,
    distanceKm: 6,
    driveTimeMinutes: 15,
    description:
      'Four-star business hotel with reliable Wi-Fi, English-speaking staff, and walkable cafés.',
    website: 'https://example.com/business-hotel-semarang',
    mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_4_STAR_A',
  },
  {
    name: 'TODO_PLACEHOLDER_CITY_INN_SEMARANG',
    stars: 4,
    distanceKm: 9,
    driveTimeMinutes: 22,
    description:
      'Four-star inn with on-site restaurant and complimentary breakfast — popular with returning buyers.',
    website: 'https://example.com/city-inn-semarang',
    mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_4_STAR_B',
  },
  {
    name: 'TODO_PLACEHOLDER_BUDGET_LODGE_SEMARANG',
    stars: 3,
    distanceKm: 5,
    driveTimeMinutes: 12,
    description:
      'Three-star lodge close to the factory — clean rooms, basic amenities, friendly staff.',
    website: 'https://example.com/budget-lodge-semarang',
    mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_3_STAR_A',
  },
  {
    name: 'TODO_PLACEHOLDER_VALUE_INN_SEMARANG',
    stars: 3,
    distanceKm: 7,
    driveTimeMinutes: 18,
    description:
      'Three-star value inn with secure parking, suitable for short pre-shipment inspection trips.',
    website: 'https://example.com/value-inn-semarang',
    mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_3_STAR_B',
  },
] as const;

/**
 * Travel hubs — Contact page Block 7.2.
 * Distances and drive times are approximate; confirm with logistics before launch.
 */
export const travelHubs = [
  {
    from: 'Jakarta',
    distanceKm: 450,
    byCar: 'approx. 7 hours',
    byTrainCar: 'approx. 5h train + 30min car',
    notes: 'Argo Bromo Anggrek and Argo Sindoro express trains daily.',
  },
  {
    from: 'Yogyakarta',
    distanceKm: 130,
    byCar: 'approx. 3 hours',
    byTrainCar: 'approx. 2h train + 30min car',
    notes: 'Frequent Joglosemarkerto train service.',
  },
  {
    from: 'Surabaya',
    distanceKm: 350,
    byCar: 'approx. 6 hours',
    byTrainCar: 'approx. 4h train + 30min car',
    notes: 'Argo Bromo Anggrek westbound.',
  },
  {
    from: 'Semarang city centre',
    distanceKm: 8,
    byCar: 'approx. 20 minutes',
    notes: 'Standard taxi or ride-hail.',
  },
  {
    from: 'Semarang Ahmad Yani Airport (SRG)',
    distanceKm: 12,
    byCar: 'approx. 30 minutes',
    notes: 'Free buyer pickup available — request in advance via WhatsApp.',
  },
  {
    from: 'Yogyakarta Adisutjipto Airport (YIA)',
    distanceKm: 140,
    byCar: 'approx. 3 hours',
    byTrainCar: 'approx. 2h train + 30min car',
    notes: 'Free buyer pickup available — request in advance via WhatsApp.',
  },
] as const;

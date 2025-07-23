import { createClient } from '@supabase/supabase-js'

// Get Supabase credentials from environment or use demo values
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

// Check if we have real credentials
const hasRealCredentials = SUPABASE_URL !== 'https://demo-project.supabase.co' && SUPABASE_ANON_KEY !== 'demo-key'

let supabase

if (hasRealCredentials) {
  // Use real Supabase client
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  })
  console.log('🚀 Connected to Supabase database')
} else {
  // Use demo client with local data
  console.log('🔧 Using demo mode - Connect Supabase for full functionality')
  
  // Mock vehicle data for demo
  const demoVehicles = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2024,
      price: 28999,
      mileage: 12000,
      vin: '1HGBH41JXMN109186',
      stock_number: 'TC2024001',
      fuel_type: 'Gasoline',
      transmission: 'Automatic',
      condition: 'New',
      exterior_color: 'Midnight Black',
      interior_color: 'Ash Gray',
      drivetrain: 'FWD',
      engine: '2.5L 4-Cylinder',
      doors: 4,
      seating: 5,
      city_mpg: 32,
      highway_mpg: 41,
      combined_mpg: 36,
      images: [
        'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop'
      ],
      features: [
        'Bluetooth Connectivity',
        'Backup Camera',
        'Heated Front Seats',
        'Apple CarPlay',
        'Android Auto',
        'Lane Keep Assist',
        'Adaptive Cruise Control',
        'Blind Spot Monitoring',
        'LED Headlights',
        'Keyless Entry',
        'Push Button Start',
        'Dual-Zone Climate Control'
      ],
      description: 'This pristine 2024 Toyota Camry offers the perfect blend of style, comfort, and reliability. With advanced safety features and modern technology, this vehicle is perfect for daily commuting and long road trips.',
      warranty: '3 years / 36,000 miles',
      history: 'Clean CarFax report available',
      status: 'available',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Accord',
      year: 2023,
      price: 25999,
      mileage: 25000,
      vin: '1HGBH41JXMN109187',
      stock_number: 'HA2023001',
      fuel_type: 'Gasoline',
      transmission: 'Automatic',
      condition: 'Used',
      exterior_color: 'Silver Metallic',
      interior_color: 'Black Leather',
      drivetrain: 'FWD',
      engine: '1.5L Turbo 4-Cylinder',
      doors: 4,
      seating: 5,
      city_mpg: 30,
      highway_mpg: 38,
      combined_mpg: 33,
      images: [
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop'
      ],
      features: [
        'Apple CarPlay',
        'Lane Keep Assist',
        'Sunroof',
        'Heated Seats',
        'Bluetooth',
        'Backup Camera',
        'Cruise Control',
        'Power Seats',
        'Alloy Wheels',
        'Fog Lights',
        'Remote Start',
        'Leather Interior'
      ],
      description: 'Excellent condition 2023 Honda Accord with low mileage and premium features. This reliable sedan offers great fuel economy and a comfortable ride.',
      warranty: '2 years / 24,000 miles remaining',
      history: 'One owner, clean history, non-smoker',
      status: 'available',
      created_at: '2024-01-14T10:00:00Z'
    },
    {
      id: 3,
      make: 'Ford',
      model: 'F-150',
      year: 2024,
      price: 45999,
      mileage: 5000,
      vin: '1FTFW1E50NFC12345',
      stock_number: 'FF2024001',
      fuel_type: 'Gasoline',
      transmission: 'Automatic',
      condition: 'New',
      exterior_color: 'Oxford White',
      interior_color: 'Black Leather',
      drivetrain: '4WD',
      engine: '3.5L V6 EcoBoost',
      doors: 4,
      seating: 5,
      city_mpg: 20,
      highway_mpg: 24,
      combined_mpg: 22,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0acce3d4633?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
      ],
      features: [
        '4WD',
        'Towing Package (11,500 lbs)',
        'Leather Seats',
        'Navigation System',
        'SYNC 4 Infotainment',
        'Adaptive Cruise Control',
        'Blind Spot Monitoring',
        'LED Headlights',
        'Spray-In Bed Liner',
        'Running Boards',
        'Remote Start',
        'Heated/Cooled Seats'
      ],
      description: 'Brand new 2024 Ford F-150 with the powerful EcoBoost engine and 4WD capability. Perfect for work or play with exceptional towing capacity.',
      warranty: '3 years / 36,000 miles bumper-to-bumper',
      history: 'Brand new vehicle - 0 previous owners',
      status: 'available',
      created_at: '2024-01-13T10:00:00Z'
    },
    {
      id: 4,
      make: 'BMW',
      model: '3 Series',
      year: 2023,
      price: 42999,
      mileage: 18000,
      vin: 'WBA5A5C50JA123456',
      stock_number: 'BMW2023001',
      fuel_type: 'Gasoline',
      transmission: 'Automatic',
      condition: 'Used',
      exterior_color: 'Mineral Gray Metallic',
      interior_color: 'Black SensaTec',
      drivetrain: 'RWD',
      engine: '2.0L Turbo 4-Cylinder',
      doors: 4,
      seating: 5,
      city_mpg: 26,
      highway_mpg: 36,
      combined_mpg: 30,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
      ],
      features: [
        'Premium Sound System',
        'Navigation System',
        'Sport Package',
        'Sunroof',
        'Leather Seats',
        'Heated Seats',
        'Bluetooth',
        'Backup Camera',
        'Xenon Headlights',
        'Alloy Wheels',
        'Power Seats',
        'Sport Steering Wheel'
      ],
      description: 'Sophisticated 2023 BMW 3 Series with sport package and premium features. This luxury sedan delivers exceptional performance and comfort.',
      warranty: '1 year / 12,000 miles remaining BMW warranty',
      history: 'Single owner, garage kept, non-smoker',
      status: 'available',
      created_at: '2024-01-12T10:00:00Z'
    },
    {
      id: 5,
      make: 'Tesla',
      model: 'Model 3',
      year: 2024,
      price: 39999,
      mileage: 8000,
      vin: '5YJ3E1EA1KF123456',
      stock_number: 'TM2024001',
      fuel_type: 'Electric',
      transmission: 'Single Speed',
      condition: 'Used',
      exterior_color: 'Pearl White Multi-Coat',
      interior_color: 'Black Premium Interior',
      drivetrain: 'RWD',
      engine: 'Electric Motor',
      doors: 4,
      seating: 5,
      city_mpg: 134,
      highway_mpg: 126,
      combined_mpg: 130,
      images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
      ],
      features: [
        'Autopilot',
        'Supercharging Capable',
        'Glass Roof',
        'Premium Connectivity',
        '15" Touchscreen',
        'Over-the-Air Updates',
        'Mobile Connector',
        'Premium Audio',
        'Heated Seats',
        'HEPA Air Filter',
        'Sentry Mode',
        'Dog Mode'
      ],
      description: 'Nearly new 2024 Tesla Model 3 with low mileage and all premium features. This electric sedan offers cutting-edge technology and zero emissions.',
      warranty: '3 years / 28,000 miles remaining basic warranty',
      history: 'Single owner, always garaged, excellent condition',
      status: 'available',
      created_at: '2024-01-11T10:00:00Z'
    },
    {
      id: 6,
      make: 'Chevrolet',
      model: 'Silverado',
      year: 2023,
      price: 38999,
      mileage: 22000,
      vin: '1GCPWBEH5NZ123456',
      stock_number: 'CS2023001',
      fuel_type: 'Gasoline',
      transmission: 'Automatic',
      condition: 'Used',
      exterior_color: 'Summit White',
      interior_color: 'Jet Black Cloth',
      drivetrain: '4WD',
      engine: '5.3L V8',
      doors: 4,
      seating: 6,
      city_mpg: 16,
      highway_mpg: 22,
      combined_mpg: 19,
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0acce3d4633?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
      ],
      features: [
        'Crew Cab',
        'Spray-In Bed Liner',
        'Tow Package (9,400 lbs)',
        'Bluetooth',
        'Backup Camera',
        '4WD',
        'Remote Start',
        'Power Windows',
        'Power Locks',
        'Cruise Control',
        'Air Conditioning',
        'USB Ports'
      ],
      description: 'Reliable 2023 Chevrolet Silverado 1500 Crew Cab with 4WD and towing package. Perfect work truck with comfortable seating and proven V8 power.',
      warranty: '2 years / 14,000 miles remaining powertrain warranty',
      history: 'Fleet vehicle, regular maintenance, good condition',
      status: 'available',
      created_at: '2024-01-10T10:00:00Z'
    }
  ]

  // Create mock client
  supabase = {
    from: (table) => ({
      select: (columns = '*') => {
        if (table === 'vehicles_db2024') {
          return {
            eq: (column, value) => Promise.resolve({
              data: demoVehicles.filter(v => v[column] === value),
              error: null
            }),
            limit: (count) => Promise.resolve({
              data: demoVehicles.slice(0, count),
              error: null
            }),
            single: () => Promise.resolve({
              data: demoVehicles[0],
              error: null
            })
          }
        }
        return Promise.resolve({ data: demoVehicles, error: null })
      },
      insert: (data) => Promise.resolve({ data, error: null }),
      update: (data) => Promise.resolve({ data, error: null }),
      delete: () => Promise.resolve({ data: null, error: null })
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: (callback) => {
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
      signInWithPassword: ({ email, password }) => {
        return Promise.resolve({ data: null, error: { message: 'Use demo auth' } })
      },
      signOut: () => Promise.resolve({ error: null })
    }
  }
}

export { supabase }
export default supabase
import { supabase } from '../lib/supabase'
import { sampleInventory } from '../data/sampleInventory'

// Vehicle service to handle all vehicle-related database operations
export class VehicleService {
  constructor() {
    this.tableName = 'vehicles_db2024'
    this.useSampleData = true // Set to true to use sample data instead of database
  }

  // Get all vehicles
  async getAllVehicles() {
    try {
      console.log('VehicleService: Fetching all vehicles...')
      
      // Use sample data if flagged or if database connection fails
      if (this.useSampleData) {
        console.log('VehicleService: Using sample inventory data')
        return { data: sampleInventory, error: null }
      }
      
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')

      if (error) {
        console.error('VehicleService Error:', error)
        // Fallback to sample data on error
        return { data: sampleInventory, error: null }
      }

      console.log('VehicleService: Fetched vehicles:', data)
      // Transform database format to frontend format
      const transformedData = data?.map(this.transformVehicleData) || []
      return { data: transformedData, error: null }
    } catch (err) {
      console.error('VehicleService Exception:', err)
      // Fallback to sample data on exception
      return { data: sampleInventory, error: null }
    }
  }

  // Get vehicle by ID
  async getVehicleById(id) {
    try {
      console.log('VehicleService: Fetching vehicle by ID:', id)
      
      // Use sample data if flagged or if database connection fails
      if (this.useSampleData) {
        console.log('VehicleService: Using sample inventory data for ID:', id)
        const vehicle = sampleInventory.find(v => v.id === parseInt(id))
        return { data: vehicle, error: vehicle ? null : 'Vehicle not found' }
      }
      
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', parseInt(id))
        .single()

      if (error) {
        console.error('VehicleService Error:', error)
        // Fallback to sample data on error
        const vehicle = sampleInventory.find(v => v.id === parseInt(id))
        return { data: vehicle, error: vehicle ? null : 'Vehicle not found' }
      }

      console.log('VehicleService: Fetched vehicle:', data)
      // Transform database format to frontend format
      const transformedData = data ? this.transformVehicleData(data) : null
      return { data: transformedData, error: null }
    } catch (err) {
      console.error('VehicleService Exception:', err)
      // Fallback to sample data on exception
      const vehicle = sampleInventory.find(v => v.id === parseInt(id))
      return { data: vehicle, error: vehicle ? null : 'Vehicle not found' }
    }
  }

  // Transform database format to frontend format
  transformVehicleData(dbVehicle) {
    if (!dbVehicle) return null
    return {
      id: dbVehicle.id,
      make: dbVehicle.make,
      model: dbVehicle.model,
      year: dbVehicle.year,
      price: dbVehicle.price,
      mileage: dbVehicle.mileage,
      vin: dbVehicle.vin,
      stockNumber: dbVehicle.stock_number || dbVehicle.stockNumber,
      fuelType: dbVehicle.fuel_type || dbVehicle.fuelType,
      transmission: dbVehicle.transmission,
      condition: dbVehicle.condition,
      exteriorColor: dbVehicle.exterior_color || dbVehicle.exteriorColor,
      interiorColor: dbVehicle.interior_color || dbVehicle.interiorColor,
      drivetrain: dbVehicle.drivetrain,
      engine: dbVehicle.engine,
      doors: dbVehicle.doors,
      seating: dbVehicle.seating,
      cityMPG: dbVehicle.city_mpg || dbVehicle.cityMPG,
      highwayMPG: dbVehicle.highway_mpg || dbVehicle.highwayMPG,
      combinedMPG: dbVehicle.combined_mpg || dbVehicle.combinedMPG,
      images: dbVehicle.images || [],
      features: dbVehicle.features || [],
      description: dbVehicle.description,
      warranty: dbVehicle.warranty,
      history: dbVehicle.history,
      status: dbVehicle.status,
      createdAt: dbVehicle.created_at || dbVehicle.createdAt
    }
  }

  // Create new vehicle
  async createVehicle(vehicleData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([this.transformToDbFormat(vehicleData)])
        .select()
        .single()

      if (error) {
        console.error('VehicleService Create Error:', error)
        return { data: null, error }
      }

      return { data: this.transformVehicleData(data), error: null }
    } catch (err) {
      console.error('VehicleService Create Exception:', err)
      return { data: null, error: err }
    }
  }

  // Update vehicle
  async updateVehicle(id, vehicleData) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(this.transformToDbFormat(vehicleData))
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('VehicleService Update Error:', error)
        return { data: null, error }
      }

      return { data: this.transformVehicleData(data), error: null }
    } catch (err) {
      console.error('VehicleService Update Exception:', err)
      return { data: null, error: err }
    }
  }

  // Delete vehicle
  async deleteVehicle(id) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id)

      if (error) {
        console.error('VehicleService Delete Error:', error)
        return { error }
      }

      return { error: null }
    } catch (err) {
      console.error('VehicleService Delete Exception:', err)
      return { error: err }
    }
  }

  // Transform frontend format to database format
  transformToDbFormat(vehicle) {
    return {
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      vin: vehicle.vin,
      stock_number: vehicle.stockNumber,
      fuel_type: vehicle.fuelType,
      transmission: vehicle.transmission,
      condition: vehicle.condition,
      exterior_color: vehicle.exteriorColor,
      interior_color: vehicle.interiorColor,
      drivetrain: vehicle.drivetrain,
      engine: vehicle.engine,
      doors: vehicle.doors,
      seating: vehicle.seating,
      city_mpg: vehicle.cityMPG,
      highway_mpg: vehicle.highwayMPG,
      combined_mpg: vehicle.combinedMPG,
      images: vehicle.images,
      features: vehicle.features,
      description: vehicle.description,
      warranty: vehicle.warranty,
      history: vehicle.history,
      status: vehicle.status || 'available'
    }
  }
}

// Export singleton instance
export const vehicleService = new VehicleService()
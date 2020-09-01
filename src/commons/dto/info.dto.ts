import { IsNotEmpty, IsEnum } from 'class-validator'
import { ViaEnum } from '../enums/via.enum'

export class InfoDto {
  @IsNotEmpty()
  device_id: string

  @IsNotEmpty()
  device_type: string

  @IsNotEmpty()
  brand: string

  @IsNotEmpty()
  @IsEnum(ViaEnum)
  via: ViaEnum

  @IsNotEmpty()
  system_version: string

  @IsNotEmpty()
  app_version: string

  @IsNotEmpty()
  app_build_number: string

  @IsNotEmpty()
  env: string

  @IsNotEmpty()
  mac_address: string

  fcm_token: string

  imei: string
}

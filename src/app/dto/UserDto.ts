import {
    IsString,
    IsDefined,
    IsOptional,
} from "class-validator";

/**
 * Data transfer object (DTO) with expected fields for creating users
 */
export class UserDto {

    @IsString()
    @IsDefined()
    public name: string;

    @IsString()
    @IsOptional()
    public address: string;

}

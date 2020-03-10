import {
    IsDefined,
    IsUUID
} from "class-validator";

/**
 * Data transfer object (DTO) with expected fields for user params.
 */
export class UserParamsDto {

    @IsUUID()
    @IsDefined()
    public id: string;
}

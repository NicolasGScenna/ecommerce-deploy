import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('files')
export class FilesController{
    constructor(private readonly filesService: FilesService){}

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@Param('id')id: string,@UploadedFile(
        new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({maxSize: 200 * 1024}),
                new FileTypeValidator({fileType: /^image\/(jpg|jpeg|png|webp)$/})
            ],
        })
    )file: Express.Multer.File){
        return this.filesService.uploadImage(id,file);
    }
}
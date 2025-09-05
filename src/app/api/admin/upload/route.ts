import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {NextRequest, NextResponse} from "next/server";
import {v4 as uuid} from 'uuid';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

console.log('Access Key Loaded:', process.env.AWS_ACCESS_KEY_ID?.substring(0, 5));

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export async function POST(request: NextRequest) {
    try {
        const {fileName, fileType} = await request.json();
        if (!fileName || !fileType) {
            return NextResponse.json({message: 'File name and type are required'}, {status: 400})
        }
        const uniqueKey = `images/${uuid()}-${fileName}`;
        const putCommend = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: uniqueKey,
            ContentType: fileType,
        })

        const uploadUrl = await getSignedUrl(s3Client, putCommend, {expiresIn: 3600});
        const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

        return NextResponse.json({uploadUrl, fileUrl});
    } catch (error) {
        console.error("Error creating presigned URL", error);
        return NextResponse.json({message: 'Error creating presigned URL', error});
    }
}

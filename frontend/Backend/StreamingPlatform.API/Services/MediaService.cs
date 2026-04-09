using Amazon.S3;
using Amazon.S3.Model;
using Amazon.CloudFront;
using Amazon.CloudFront.Model;

namespace StreamingPlatform.API.Services;

public class MediaService
{
    private readonly IAmazonS3 _s3Client;
    private readonly IAmazonCloudFront _cloudFrontClient;
    private readonly string _bucketName;
    private readonly string _cloudFrontDistributionId;

    public MediaService(IConfiguration configuration)
    {
        // Initialize AWS clients (you'll need to configure AWS credentials)
        // For now, this is a placeholder structure
        _bucketName = configuration["AWS:S3BucketName"] ?? "streaming-platform-media";
        _cloudFrontDistributionId = configuration["AWS:CloudFrontDistributionId"] ?? "";
        
        // In production, initialize with actual AWS credentials
        // _s3Client = new AmazonS3Client(region);
        // _cloudFrontClient = new AmazonCloudFrontClient(region);
    }

    public async Task<string> UploadVideoAsync(Stream videoStream, string fileName, string contentType)
    {
        // Upload video to S3
        var request = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = $"videos/{fileName}",
            InputStream = videoStream,
            ContentType = contentType
        };

        await _s3Client.PutObjectAsync(request);

        // Generate CloudFront URL
        var cloudFrontUrl = $"https://{_cloudFrontDistributionId}.cloudfront.net/videos/{fileName}";
        
        return cloudFrontUrl;
    }

    public async Task<string> UploadThumbnailAsync(Stream thumbnailStream, string fileName)
    {
        var request = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = $"thumbnails/{fileName}",
            InputStream = thumbnailStream,
            ContentType = "image/jpeg"
        };

        await _s3Client.PutObjectAsync(request);

        var cloudFrontUrl = $"https://{_cloudFrontDistributionId}.cloudfront.net/thumbnails/{fileName}";
        
        return cloudFrontUrl;
    }

    public async Task<string> GenerateSignedUrlAsync(string objectKey, int expirationMinutes = 60)
    {
        // Generate pre-signed URL for secure video access
        var request = new GetPreSignedUrlRequest
        {
            BucketName = _bucketName,
            Key = objectKey,
            Verb = HttpVerb.GET,
            Expires = DateTime.UtcNow.AddMinutes(expirationMinutes)
        };

        return await _s3Client.GetPreSignedURLAsync(request);
    }

    public async Task<bool> DeleteMediaAsync(string objectKey)
    {
        try
        {
            var request = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = objectKey
            };

            await _s3Client.DeleteObjectAsync(request);
            return true;
        }
        catch
        {
            return false;
        }
    }
}


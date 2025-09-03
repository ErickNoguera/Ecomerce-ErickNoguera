import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: `.env` });

export const CloudinaryConfig = {
  provide: `CLOUDINARY`,
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dd6lcqk7v',
      api_key: '156748231846297',
      api_secret: '<your_api_secret>', // Click 'View API Keys' above to copy your API secret
    });
  },
};

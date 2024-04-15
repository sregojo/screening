import { ApiService } from "./application/ApiService";

const configuration = {
    Api: { 
        Path: '/api', 
        Port: 3000
    },
    MongoDb: { 
        connectionString: 'mongodb://127.0.0.1:27017/screening;'
    }
    
}
const apiService = new ApiService(configuration);
apiService.Start();

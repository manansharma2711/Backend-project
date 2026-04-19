class ApiResponse{
    constructor(
         statusCode,
         data,
         message ="Success"
    ){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=statusCode<400 
        //There are status codes of servers
        // For example: Information Responses: 100-199
        //              Successful Responses: 200-299
        //              Redirection Messages: 300-399
        //              Client Error Responses: 400-499
        //              Server Error Responses: 500-599
        
    }
}
//this file is only used to make a method and then export it

const asyncHandler= (requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}


export {asyncHandler}




//can also write as

// const asyncHandler = () => {}  //Normal Function
// const asyncHandler = (func) => () => {} // Higher order function
// const asyncHandler = (func) => async () => {} // async higher order function
// above 3 lines are just the explanation of the funtion written below

// the code written below involves try catch, this is used in some codes
//  but mostly promises are used which is written above

/*
const asyncHandler= (fn) => async (req,res,next) => {  // we write like this coz asyncHandler is a higher order funation
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message: error.message
        })
    }
}  
*/
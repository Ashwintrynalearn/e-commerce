import { asyncHandler } from '../utils/async-handler.js';

const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(
        { message: 'Server is healthy and is running' },
    );
});

export { healthCheck };
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';
        const ip = req.ip;

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');

            // ANSI colors
            const RED = '\x1b[31m';
            const YELLOW = '\x1b[33m';
            const GREEN = '\x1b[32m';

            let color = GREEN; // Default success
            if (statusCode >= 500) color = RED;        // Server errors
            else if (statusCode >= 400) color = YELLOW; // Client errors

            this.logger.log(
                `${color}${method} ${originalUrl} ${statusCode} ${GREEN}${contentLength || 0}b - ${userAgent} ${ip}`,
            );
        });

        next();
    }
}
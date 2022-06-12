import { Route } from './../domain/Route';

/**
 * Supported types:
 * - GPX
 * - TCX
 */
export interface IParser {
    /**
     * Parse file into custom class (Route)
     * 
     * @param filepath Absolute path of the file
     * @return Route 
     */
    fromFileToDomain(filePath: string): Route;
}
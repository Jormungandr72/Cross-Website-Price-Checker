import { DEBUG } from './config'

export const debugLog = (title, logs = [], type = 'log', collapsed = true) => {
    if (!DEBUG) return;

    const timestamp = new Date().toISOString();
    const styles = {
        log: 'color: #4caf50; font-weight: bold',
        error: 'color: #f44336; font-weight: bold',
        warn: 'color: #ff9800; font-weight: bold',
        info: 'color: #2196f3; font-weight: bold',
    };

    const consoleFn = type === 'error' ? console.error
                    : type === 'warn' ? console.warn
                    : type === 'info' ? console.info
                    : console.log;

    const groupTitle = `%c[${timestamp}] [${type.toUpperCase()}]: ${title}`;
    if (collapsed) {
        console.groupCollapsed(groupTitle, styles[type]);
    } else {
        console.group(groupTitle, styles[type]);
    }

    if (!Array.isArray(logs)) {
        consoleFn(logs); // If you pass a single object instead of array
    } else {
        logs.forEach(log => {
            if (typeof log === 'object') {
                consoleFn(log);
            } else {
                consoleFn(`%c${log}`, styles[type]);
            }
        });
    }

    console.groupEnd();
}
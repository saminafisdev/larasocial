import { formatDistanceToNow, parseISO } from 'date-fns';

export const timeAgo = (timestamp) => {
    const date = parseISO(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
};

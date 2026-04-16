import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { MouseEvent } from 'react';

interface TaskTagsProps {
    onTagClick?: (event: MouseEvent<HTMLDivElement>, tag: string) => void;
    tags: string[];
}

const TaskTags = ({ onTagClick, tags }: TaskTagsProps) => {
    return (
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }} useFlexGap>
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    onClick={onTagClick ? (event) => onTagClick(event, tag) : undefined}
                    size="small"
                    sx={{ cursor: onTagClick ? 'pointer' : 'default' }}
                    variant="outlined"
                />
            ))}
        </Stack>
    );
};

export default TaskTags;

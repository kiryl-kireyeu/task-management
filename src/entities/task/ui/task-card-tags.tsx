import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { MouseEvent } from 'react';

interface TaskCardTagsProps {
    tags: string[];
    onTagClick: (event: MouseEvent<HTMLDivElement>, tag: string) => void;
}

const TaskCardTags = ({ tags, onTagClick }: TaskCardTagsProps) => {
    return (
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }} useFlexGap>
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    onClick={(event) => onTagClick(event, tag)}
                    size="small"
                    sx={{ cursor: 'pointer' }}
                    variant="outlined"
                />
            ))}
        </Stack>
    );
};

export default TaskCardTags;

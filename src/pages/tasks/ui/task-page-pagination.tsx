import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

interface TaskPagePaginationProps {
    count: number;
    onChange: (page: number) => void;
    page: number;
}

const TaskPagePagination = ({ count, onChange, page }: TaskPagePaginationProps) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
            <Pagination
                count={count}
                onChange={(_event, value) => onChange(value)}
                page={page}
                shape="rounded"
            />
        </Box>
    );
};

export default TaskPagePagination;

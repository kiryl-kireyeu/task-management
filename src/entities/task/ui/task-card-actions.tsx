import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import { STATUS_COLORS, STATUS_LABELS } from '../model/constants';
import type { TaskStatus } from '../model/types';

interface TaskCardActionsProps {
    status: TaskStatus;
    onStatusChange: (event: SelectChangeEvent<TaskStatus>) => void;
}

const TaskCardActions = ({ status, onStatusChange }: TaskCardActionsProps) => {
    return (
        <Select
            onChange={onStatusChange}
            onClick={(event) => event.stopPropagation()}
            size="small"
            sx={{ minWidth: 150 }}
            value={status}
        >
            {(Object.keys(STATUS_LABELS) as TaskStatus[]).map((currentStatus) => (
                <MenuItem key={currentStatus} value={currentStatus}>
                    <Chip
                        color={STATUS_COLORS[currentStatus]}
                        label={STATUS_LABELS[currentStatus]}
                        size="small"
                    />
                </MenuItem>
            ))}
        </Select>
    );
};

export default TaskCardActions;

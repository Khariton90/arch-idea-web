import { Stack, Chip, Tooltip } from '@mui/material'
import { mappingStatus, mappingPriority } from '../../lib'
import styles from './styles.module.scss'

type Colors = 'warning' | 'success' | 'primary' | 'info'

const mapStatusColor = {
	[mappingStatus.Canceled]: 'warning',
	[mappingStatus.Completed]: 'success',
	[mappingStatus.InProgress]: 'primary',
	[mappingStatus.New]: 'info',
}

const mapPriorityColor = {
	[mappingPriority.Low]: 'warning',
	[mappingPriority.Medium]: 'success',
	[mappingPriority.High]: 'error',
}

interface Props {
	status: string
	priority: string
	subDepartment: string
	size?: 'small' | 'medium'
}

export function Chips({
	status,
	priority,
	subDepartment,
	size = 'small',
}: Props) {
	return (
		<Stack direction='row' spacing={1} className={styles.chips}>
			<Tooltip title={`Статус: ${status}`} placement='bottom'>
				<Chip
					size={size}
					sx={{ fontSize: '10px', borderRadius: '4px' }}
					label={`${status}`}
					color={mapStatusColor[status] as Colors}
				/>
			</Tooltip>
			<Tooltip title={`Приоритет: ${priority}`} placement='bottom'>
				<Chip
					size={size}
					label={`Приоритет ${priority}`}
					color={mapPriorityColor[priority] as Colors}
					sx={{ fontSize: '10px', borderRadius: '4px' }}
				/>
			</Tooltip>
			<Tooltip title={`Категория: ${subDepartment}`} placement='bottom'>
				<Chip
					size={size}
					label={`${subDepartment}`}
					color='default'
					sx={{ fontSize: '10px', borderRadius: '4px' }}
				/>
			</Tooltip>
		</Stack>
	)
}

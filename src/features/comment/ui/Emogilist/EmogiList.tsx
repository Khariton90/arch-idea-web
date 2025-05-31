import styles from './styles.module.scss'

const emojisUnicode = [
	'😀',
	'😂',
	'🙂',
	'😡',
	'😕',
	'😤',
	'👍',
	'👎',
	'🙏',
	'🙌',
	'💩',
	'👋',
	'💡',
]

interface Props {
	selectEmojiForComment: (emogi: string) => void
}

export function EmogiList({ selectEmojiForComment }: Props) {
	return (
		<div className={styles.emogi}>
			{emojisUnicode.map(emoji => (
				<button
					type='button'
					key={emoji}
					onClick={() => selectEmojiForComment(emoji)}
				>
					{emoji}
				</button>
			))}
		</div>
	)
}

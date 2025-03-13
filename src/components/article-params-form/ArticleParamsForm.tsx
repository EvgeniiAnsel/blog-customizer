import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from '../../components/arrow-button';
import { Button } from '../../components/button';
import { useState } from 'react';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
import { Text } from '../../components/text';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from '../../../src/constants/articleProps';

interface ArticleParamsFormProps {
	setArticleState: (value: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [settings, setSettings] = useState(defaultArticleState);

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(settings);
	};

	const handleReset = () => {
		setSettings(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const updateSetting = (field: keyof typeof settings, value: any) => {
		setSettings((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={open} setOpen={setOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						title='Шрифт'
						selected={settings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => updateSetting('fontFamilyOption', option)}
					/>
					<Spacing size={50} />
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={(option) => updateSetting('fontSizeOption', option)}
						title='Размер шрифта'
					/>
					<Spacing size={50} />

					<Select
						title='Цвет шрифта'
						selected={settings.fontColor}
						options={fontColors}
						onChange={(option) => updateSetting('fontColor', option)}
					/>
					<Spacing size={50} />

					<Separator />
					<Spacing size={50} />

					<Select
						title='Цвет фона'
						selected={settings.backgroundColor}
						options={backgroundColors}
						onChange={(option) => updateSetting('backgroundColor', option)}
					/>
					<Spacing size={50} />

					<Select
						title='Ширина контента'
						selected={settings.contentWidth}
						options={contentWidthArr}
						onChange={(option) => updateSetting('contentWidth', option)}
					/>
					<Spacing size={50} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

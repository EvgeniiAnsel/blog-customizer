import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacing } from '../../ui/spacing';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from '../../../src/constants/articleProps';
import { useOutsideClickClose } from '../../../src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	setArticleState: (value: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [settings, setSettings] = useState(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: open,
		rootRef: sidebarRef,
		onChange: (newValue) => setOpen(newValue),
	});

	const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(settings);
	};

	const handleReset = () => {
		setSettings(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const updateSetting = (field: keyof typeof settings, value: OptionType) => {
		setSettings((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<>
			<ArrowButton isOpen={open} setOpen={setOpen} />
			<aside
				ref={sidebarRef}
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

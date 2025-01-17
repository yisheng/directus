import { i18n } from '@/lang';
import { User } from '@directus/shared/types';

export function userName(user?: Partial<User>): string {
	if (!user) {
		return i18n.global.t('unknown_user') as string;
	}

	if (user.first_name && user.last_name) {
		return `${user.last_name}${user.first_name}`;
	}

	if (user.first_name) {
		return user.first_name;
	}

	if (user.last_name) {
		return user.last_name;
	}

	if (user.email) {
		return user.email;
	}

	return i18n.global.t('unknown_user') as string;
}

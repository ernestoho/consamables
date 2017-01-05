import moment from 'moment';
import { Map } from 'immutable';

export const calculateHours = (currentTime, hours) => {
    const now = moment(currentTime);
    const midnight = moment(currentTime).startOf('day');
    const morning = moment(currentTime).hour(5).minute(0);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const afterMidnight = time => time.isBetween(midnight, morning, null, '[]');
    const toMoment = time => moment(time, 'hh:mma');

    const today = weekdays[now.day()];
    const currentHours = hours[today];
    let [openTime, closeTime] = currentHours.split('-').map(toMoment);

    if (afterMidnight(now)) {
        let yesterday = '';
        if (now.day() === 0) {
            yesterday = weekdays[6];
        } else {
            yesterday = weekdays[now.day() - 1];
        }
        closeTime = toMoment(hours[yesterday].split('-')[1]);

        if (!afterMidnight(closeTime)) {
            closeTime.subtract(1, 'days');
        }

    } else {
        if (afterMidnight(closeTime)) {
            closeTime.add(1, 'days');
        }

        if (now.isAfter(closeTime)) {
            openTime.add(1, 'days');
        }
    }

    const open = now.isBefore(closeTime);
    openTime = openTime.valueOf();
    closeTime = closeTime.valueOf();

    return Map({ openTime, closeTime, open });
};


export const buildOrderType = prefs => {
    const { delivery, carryout, outing } = prefs.toJS();

    if (outing && (delivery || carryout)) {
        return 'any';
    } else if (outing && !(delivery || carryout)) {
        return 'outing';
    } else {
        return 'delivery or carryout';
    }
};


export const TokenManager = {
    storeAccessToken: accessToken => localStorage.setItem('accessToken', accessToken),
    retrieveAccessToken: () => localStorage.accessToken,
    clearAccessToken: () => localStorage.removeItem('accessToken')
};


export const buildPostInit = data => ({
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenManager.retrieveAccessToken()}`
    })
});


export const testUsername = username => /^[\w-\.]+@([a-zA-Z_]+?\.)+[a-zA-Z]{2,3}$/.test(username);

export const testPassword = password => true; //TODO: implement password complexity rules

export const pizzaOverCapacity = builder => {
    let totalToppings;
    if (builder.get('size') == 'whole') {
        totalToppings = builder.get('toppings').reduce((total, side) => {
            return total + (side == 'whole' ? 1 : 0.5);
        }, 0);
    } else {
        totalToppings = builder.get('toppings').size;
    }

    const hasExtraCheese = builder.get('cheese') == 'Extra Cheese';
    const hasDiffSauce = builder.get('sauce') != builder.get('defaultSauce') && builder.get('sauce') != 'No Sauce';

    return (totalToppings + (hasDiffSauce ? 1 : 0) + (hasExtraCheese ? 1 : 0)) > builder.get('maxToppings');
};

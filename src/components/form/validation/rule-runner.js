import NexysUtils from '@nexys/utils';

const { ds: DSUtils } = NexysUtils;


export const ruleRunner = (name, label, ...validators) => {
  return state => {
    console.log(name, validators);
    const messages = validators.reduce((messages, validator) => {
      console.log(validator);
      const value = DSUtils.get(name, state);
      const errorMsgFn = validator(value, state);
      if (errorMsgFn) return messages.concat([errorMsgFn(label)]);
      else return messages;
    }, []);

    if (messages.length === 0) return {};
    return { [name]: messages };
  };
};

export const run = (state, runners) => {
  // TODO: run only on required if undefined
  return runners.reduce((memo, runner) => ({...memo, ...runner(state)}), {});
};
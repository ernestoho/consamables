export const usernameValid = username => /^[\w-\.]+@([a-zA-Z_]+?\.)+[a-zA-Z]{2,3}$/.test(username);

export const passwordValid = () => true; // TODO: implement password complexity rules

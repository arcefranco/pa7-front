export interface VerifyData {
  id: string;
  token: string;
}

export interface RequestResetData {
  username: string;
  empresa: string;
}

export interface UpdatePassData {
  newPass: string;
  confirmPass: string;
  id: string | undefined;
}

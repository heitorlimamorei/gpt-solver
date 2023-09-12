export interface IFeedBackItemProps {
  id: string;
  user_name: string;
  user_url: string;
  stars: number;
  text: string;
  financial_management_improved: number;
  did_pan_before: boolean;
}

export interface INewFeedBackProps {
  user_name: string;
  user_url: string;
  stars: number;
  text: string;
  financial_management_improved: number;
  did_pan_before: boolean;
}

export interface surveyFeedBackSubmitProps {
  stars: number;
  text: string;
  improvement: string;
  family_used: boolean;
  continued_using: boolean;
  financial_management_improved: number;
  did_pan_before: boolean;
}

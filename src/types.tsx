export type NFTLIst = {
  chain: string;
  contract_address: string;
  token_id: string;
};

export type NFT = {
  chain?: string;
  contract_address?: string;
  token_id?: string;
  metadata_url?: string;
  metadata?: Metadata;
  file_information?: FileInformation;
  file_url: string;
  animation_url?: null;
  cached_file_url?: string;
  cached_animation_url?: null;
  mint_date?: Date;
  updated_date?: Date;
  rarity?: null;
  attributes?: null;
};

export type FileInformation = {
  height?: number;
  width?: number;
  file_size?: number;
};

export type Metadata = {
  name?: string;
  description?: string;
  image?: string;
  edition?: number;
  attributes?: Attribute[];
};

export type Attribute = {
  trait_type?: string;
  value?: string;
};

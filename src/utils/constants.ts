// RPC API Keys
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
export const POCKET_NETWORK_API_KEY = process.env.POCKET_NETWORK_API_KEY
export const POCKET_NETWORK_ID = process.env.POCKET_NETWORK_ID
export const INFURA_PROJECT_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
export const ALCHEMY_PROJECT_ID =
    process.env.NEXT_PUBLIC_ALCHEMY_PROJECT_ID || ''

// Other API Keys
export const ALCHEMY_NOTIFY_TOKEN = process.env.ALCHEMY_NOTIFY_TOKEN
export const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY

// Metagame specific constants
export const EVENT_FORWARDER_AUTH_TOKEN = process.env.EVENT_FORWARDER_AUTH_TOKEN
export const EVENT_FORWARDER_AUTH_TOKEN_HEADER = 'x-event-forwarder-auth-token'
export const METABOT_BASE_API_URL = process.env.METABOT_BASE_API_URL
export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL
export const VALIDATOR_PRIVATE_KEY = process.env.VALIDATOR_PRIVATE_KEY
export const THE_METAGAME_ETH_ADDRESS =
    '0x902A37155438982884ca26A5DBccf73f5ae8194b'

// Datastore constants
export const METABOT_DB_CONNECTION_STRING =
    process.env.METABOT_DB_CONNECTION_STRING
export const EVM_TRANSLATOR_CONNECTION_STRING =
    process.env.EVM_TRANSLATOR_CONNECTION_STRING

export const INFURA_IPFS_PROJECT_ID = process.env.INFURA_IPFS_PROJECT_ID
export const INFURA_IPFS_SECRET = process.env.INFURA_IPFS_SECRET
export const INFURA_IPFS_PROJECT_ID_HEADER = `x-ipfs-project-id`
export const INFURA_IPFS_SECRET_HEADER = `x-ipfs-project-secret`

// Logging
export const DATADOG_API_KEY = process.env.DATADOG_API_KEY
export const DATADOG_RUM_APPLICATION_ID =
    process.env.NEXT_PUBLIC_DATADOG_RUM_APPLICATION_ID
export const DATADOG_RUM_CLIENT_TOKEN =
    process.env.NEXT_PUBLIC_DATADOG_RUM_CLIENT_TOKEN
export const DATADOG_RUM_ENV = process.env.NEXT_PUBLIC_DATADOG_RUM_ENV

// Prod vs Dev constants
export const isProdEnv = process.env.NODE_ENV === 'production'
export const NETWORK =
    process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() || 'goerli'
export const networkStrings = getNetworkString(NETWORK)

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
export const DB_REQUEST_TOKEN = process.env.DB_REQUEST_TOKEN

export const MONGOOSE_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING
export const NFT_METADATA_CONNECTION_STRING =
    process.env.NFT_METADATA_CONNECTION_STRING

export const NOMAD_WHITEHAT_CONTRACT_ADDRESS =
    process.env.NOMAD_WHITEHAT_CONTRACT_ADDRESS
export const LOGBOOK_CONTRACT_ADDRESS = process.env.LOGBOOK_CONTRACT_ADDRESS
export const LLAMA_PFP_CONTRACT_ADDRESS = process.env.LLAMA_PFP_CONTRACT_ADDRESS

export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

/* Frontend Constants */
// export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

type NetworkStrings = {
    alchemy: string
    ethers: string
    etherscan: string
    etherscanAPI: string
    polygonscanAPI: string
    opensea: string
    openseaAPI: string
    web3Modal: string
    networkId?: number
}

function getNetworkString(network: string): NetworkStrings {
    const defaultStrings = {
        alchemy: `eth-${network}.`,
        ethers: network,
        etherscan: `${network}.`,
        etherscanAPI: `api-${network}.`,
        polygonscanAPI: `api-testnet.`,
        opensea: 'testnets.',
        openseaAPI: `testnets-api.`,
        web3Modal: network,
    }

    switch (network.toLowerCase()) {
        case 'ethereum':
        case 'mainnet':
        case 'homestead':
            return {
                alchemy: 'eth-mainnet.',
                ethers: 'homestead',
                etherscan: '',
                etherscanAPI: 'api.',
                polygonscanAPI: 'api.',
                opensea: '',
                openseaAPI: 'api.',
                web3Modal: 'mainnet',
                networkId: 1,
            }
        case 'goerli':
            return { ...defaultStrings, networkId: 5 }
        default:
            return defaultStrings
    }
}

export const getS3LayersFolderUrl = (project: string): string =>
    `https://metagame-xyz.s3.us-east-1.amazonaws.com/nft-images/${project}/Layers/`

export const getR2LayersFolderUrl = (project: string): string =>
    `https://pub-f973221ec7dc4a44b71a25a1c673e6e8.r2.dev/${project}/Layers/`

export const getTwicPicFolderUrl = (project: string): string =>
    `https://metagame.twic.pics/nft-images/${project}/Layers/`

export type ProductionNetworks = 'ethereum' | 'polygon' | 'fantom' | 'avalanche'

export const networkScanAPIKeys = {
    ethereum: ETHERSCAN_API_KEY,
    // polygon: POLYGONSCAN_API_KEY,
    // fantom: FTMSCAN_API_KEY, // fantom
    // avalanche: SNOWTRACE_API_KEY, // avalanche
}

export const productionNetworkApiURLs = {
    ethereum: 'api.etherscan.io',
    polygon: 'api.polygonscan.com',
    fantom: 'api.ftmscan.com',
    avalanche: 'api.snowtrace.io',
}

export const blackholeAddress = '0x0000000000000000000000000000000000000000'

export const slackErrorsChannelId = ''

// export const etherscanUrl = `https://${networkStrings.etherscan}etherscan.io/address/${}`
export const twitterUrl = 'https://twitter.com/Metagame'
export const openseaUrl = `https://opensea.io/collection/`

import { gql } from "@apollo/client"
import Fragments from "./fragments"

export default gql`
  query transactionListForContact(
    $username: Username!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    me {
      id
      contactByUsername(username: $username) {
        transactions(first: $first, after: $after, last: $last, before: $before) {
          ...TransactionList
        }
      }
    }
  }

  query contacts {
    me {
      contacts {
        id
        username
        alias
        transactionsCount
      }
    }
  }

  query transactionListForDefaultAccount(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    me {
      id
      defaultAccount {
        id
        transactions(first: $first, after: $after, last: $last, before: $before) {
          ...TransactionList
        }
      }
    }
  }

  query onChainTxFee(
    $walletId: WalletId!
    $address: OnChainAddress!
    $amount: SatAmount!
    $targetConfirmations: TargetConfirmations
  ) {
    onChainTxFee(
      walletId: $walletId
      address: $address
      amount: $amount
      targetConfirmations: $targetConfirmations
    ) {
      amount
      targetConfirmations
    }
  }

  query btcPriceList($range: PriceGraphRange!) {
    btcPriceList(range: $range) {
      timestamp
      price {
        base
        offset
        currencyUnit
        formattedAmount
      }
    }
  }

  query accountLimits {
    me {
      defaultAccount {
        limits {
          withdrawal {
            totalLimit
            remainingLimit
            interval
          }
          internalSend {
            totalLimit
            remainingLimit
            interval
          }
          convert {
            totalLimit
            remainingLimit
            interval
          }
        }
      }
    }
  }

  query userDefaultWalletId($username: Username!) {
    userDefaultWalletId(username: $username)
  }

  query mainQuery($hasToken: Boolean!) {
    globals {
      nodesIds
      network
    }
    quizQuestions {
      id
      earnAmount
    }
    btcPrice {
      base
      offset
      currencyUnit
      formattedAmount
    }
    me @include(if: $hasToken) {
      id
      language
      username
      phone
      quizQuestions {
        question {
          id
          earnAmount
        }
        completed
      }
      defaultAccount {
        id
        defaultWalletId
        transactions(first: 3) {
          ...TransactionList
        }
        wallets {
          id
          balance
          walletCurrency
        }
      }
    }
    mobileVersions {
      platform
      currentSupported
      minSupported
    }
  }

  query businessMapMarkers {
    businessMapMarkers {
      username
      mapInfo {
        title
        coordinates {
          longitude
          latitude
        }
      }
    }
  }

  query walletCSVTransactions($defaultWalletId: WalletId!) {
    me {
      id
      defaultAccount {
        id
        csvTransactions(walletIds: [$defaultWalletId])
      }
    }
  }

  query initWallet {
    me {
      id
      defaultAccount {
        id
        defaultWalletId
        wallets {
          id
          balance
          walletCurrency
        }
      }
    }
  }

  # new queries dedicated to screen
  query rootStack($hasToken: Boolean!) {
    me @include(if: $hasToken) {
      username
      id
    }
    globals {
      network
    }
  }

  query conversionScreen {
    me {
      defaultAccount {
        usdWallet @client {
          id
          balance
        }
        btcWallet @client {
          id
          balance
        }
      }
    }
  }

  # test only. could be in a dedicated file
  query wallets {
    me {
      defaultAccount {
        wallets {
          walletCurrency
          id
        }
      }
    }
  }

  ${Fragments}
`